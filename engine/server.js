const restify = require('restify');
const errs = require('restify-errors');
const debug = require('debug')('dsp-engine');
const openrtb = require('openrtb');
const moment = require('moment');
const uuidv1 = require('uuid/v1');
const ResponseBuilder = openrtb.getBuilder({ builderType: 'bidResponse' });

const SwaggerUI = require('swagger-ui-restify');
const apiDocument = require('./api-docs.json');

class DSPEngine {
  constructor(options) {
    this.server = restify.createServer();
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());


    this.server.post('/dsp', this._handleBidRequest.bind(this));
    this.server.post('/dsp1', this._handleBidRequest.bind(this));
    this.server.get('/win', this._handleBidWin.bind(this));
    this.server.get('/healthcheck', this._handleHealthCheck.bind(this));
    this.server.get('/schema/*', restify.plugins.serveStaticFiles('./engine/schema'));

    this.server.get('/*', ...SwaggerUI.serve);
    this.server.get('/', SwaggerUI.setup(apiDocument));

    this.agents = [];
  }

  listen(port, myip) {
    this.server.listen(port, myip, () => {
      debug('%s listening at %s', this.server.name, this.server.url);
    });
  }

  addAgent(agent) {
    this.agents.push(agent);
  }

  _handleBidRequest(req, res, next) {
    debug('req.url=' + req.url);
    debug('req.body=%o', req.body);
    debug('req.query=%o', req.query);

    let agent = this.agents.find(a => a.type() === 'MOCK');
    if (req.query && req.query['mock']) {
      agent = this.agents.find(a => a.type() === 'MOCK');
    }

    if (req.query && req.query['agent']) {
      agent = this.agents.find(a => a.type() === req.query['agent']);
    }

    if (req.body) {
      try {
        let bids = agent.getBids(req.body.imp);
        let bidResponse = ResponseBuilder
          .timestamp(moment.utc().format())
          .status(1)
          .id(uuidv1())
          .bidderName(agent.name())
          .seatbid([
            {
              bid: bids
            }
          ])
          .build();
        res.send(bidResponse, { 'x-openrtb-version': '2.3' });
        next();
      }
      catch (errObj) {
        debug('error: %o', errObj);
        const err = new errs.InternalServerError(errObj.message);
        next(err);
      }
    } else {
      next(new errs.InvalidContentError('Missing BidRequest body'));
    }
  }

  _handleBidWin(req, res, next) {
    debug('req.url=' + req.url);
    debug('req.query=%o', req.query);
    try {
      let agentName = 'MOCK';
      if (req.query && req.query['agent']) {
        agentName = req.query['agent'];
      }
      let agent = this.agents.find(a => a.name() === agentName);
      if (!agent) {
        agent = this.agents.find(a => a.type() === agentName);
      }
      let winBid = agent.getBidById(req.query['bid']);
      if (!winBid) {
        winBid = agent.getBids([{
          "id": "1",
          "bidFloor": 1.00,
          "video": {}
        }]);
      }
      let ad = agent.getAdByCampaignId(winBid.cid);
      let creative = agent.getCreativeByAdId(ad.id);
      debug('creative: %o', creative);

      let mediaFile = `<MediaFile delivery="progressive" type="video/mp4" width="${creative.w}" height="${creative.h}" scalable="true"><![CDATA[${creative.mediaFile}]]></MediaFile>`;
      let tracking = `<Impression><![CDATA[${agent.getAdServerUrl()}/track/?price=${req.query.price}]]></Impression>`;
      let adSystem = `<AdSystem>${agent.getAdSystem()}</AdSystem><AdTitle>${ad.title}</AdTitle>`;
      let adDuration = new Date(ad.duration * 1000).toISOString().substr(11, 8);
      let videoAdMarkup = `<VAST version="2.0"><Ad id="${ad.id}"><InLine>${adSystem}<Creatives><Creative id="video"><Linear><Duration>${adDuration}</Duration><MediaFiles>${mediaFile}</MediaFiles></Linear></Creative></Creatives>${tracking}</InLine></Ad></VAST>`;
      res.setHeader('content-type', 'application/xml');
      res.sendRaw(videoAdMarkup);
    } catch (e) {
      res.setHeader('content-type', 'application/xml');
      res.sendRaw(`<VAST version=\"2.0\"><Ad id=\"7\"><InLine><AdSystem>mock-ad-server</AdSystem><AdTitle>mock-ad-7</AdTitle><Creatives><Creative id=\"video\"><Linear><Duration>00:00:15</Duration><MediaFiles><MediaFile delivery=\"progressive\" type=\"video/mp4\" width=\"718\" height=\"404\" scalable=\"true\"><![CDATA[http://testcontent.eyevinn.technology/ads/mio-15s.mp4]]></MediaFile></MediaFiles></Linear></Creative></Creatives><Impression><![CDATA[https://demand-side-platform.infytvcode.repl.co/track/?price=\${AUCTION_PRICE}]]></Impression></InLine></Ad></VAST>`);
    }

    next();
  }

  _handleHealthCheck(req, res, next) {
    debug('req.url=' + req.url);
    res.send(200);
    next();
  }
}

module.exports = DSPEngine;