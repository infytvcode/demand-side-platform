const debug = require('debug')('agent-mock');
const uuidv1 = require('uuid/v1');

const GENUIN_DEALS = [
  {
    id: 'genuin-deal-1',
    price: 12.00,
    cid: '1000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-2',
    price: 12.59,
    cid: '2000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-3',
    price: 13.5,
    cid: '3000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-4',
    price: 14.90,
    cid: '4000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-5',
    price: 16.5,
    cid: '5000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-6',
    price: 18.5,
    cid: '6000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-7',
    price: 19.90,
    cid: '7000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-8',
    price: 20.0,
    cid: '8000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-9',
    price: 24.8,
    cid: '9000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-10',
    price: 25.8,
    cid: '10000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-11',
    price: 26.79,
    cid: '11000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-12',
    price: 29.29,
    cid: '12000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-13',
    price: 32.40,
    cid: '13000',
    clearPrice: 0.9,
  },
  {
    id: 'genuin-deal-14',
    price: 35.50,
    cid: '14000',
    clearPrice: 0.9,
  }
];

const GENUIN_CAMPAIGNS = [
  {
    id: '1000',
    adid: '1',
  },
  {
    id: '2000',
    adid: '2'
  },
  {
    id: '3000',
    adid: '3'
  },
  {
    id: '4000',
    adid: '4'
  },
  {
    id: '5000',
    adid: '5'
  },
  {
    id: '6000',
    adid: '6'
  },
  {
    id: '7000',
    adid: '7'
  },
  {
    id: '8000',
    adid: '8'
  },
  {
    id: '9000',
    adid: '9'
  },
  {
    id: '10000',
    adid: '10'
  },
  {
    id: '11000',
    adid: '11'
  },
  {
    id: '12000',
    adid: '12'
  },
  {
    id: '13000',
    adid: '13'
  },
  {
    id: '14000',
    adid: '14'
  }
];

const GENUIN_ADS = [
  {
    id: '1',
    title: 'genuin-ad-1',
    duration: 15,
    crid: '1',
  },
  {
    id: '2',
    title: 'genuin-ad-2',
    duration: 15,
    crid: '2',
  },
  {
    id: '3',
    title: 'genuin-ad-3',
    duration: 10,
    crid: '3',
  },
  {
    id: '4',
    title: 'genuin-ad-4',
    duration: 15,
    crid: '4',
  },
  {
    id: '5',
    title: 'genuin-ad-5',
    duration: 10,
    crid: '5',
  },
  {
    id: '6',
    title: 'genuin-ad-6',
    duration: 15,
    crid: '6',
  },
  {
    id: '7',
    title: 'genuin-ad-7',
    duration: 15,
    crid: '7',
  },
  {
    id: '8',
    title: 'genuin-ad-8',
    duration: 15,
    crid: '8',
  },
  {
    id: '9',
    title: 'genuin-ad-9',
    duration: 20,
    crid: '9',
  },
  {
    id: '10',
    title: 'genuin-ad-10',
    duration: 15,
    crid: '10',
  },
  {
    id: '11',
    title: 'genuin-ad-11',
    duration: 10,
    crid: '11',
  },
  {
    id: '12',
    title: 'genuin-ad-12',
    duration: 20,
    crid: '12',
  },
  {
    id: '13',
    title: 'genuin-ad-13',
    duration: 15,
    crid: '13',
  },
  {
    id: '14',
    title: 'genuin-ad-14',
    duration: 10,
    crid: '14',
  }
]

const GENUIN_CREATIVES = [
  {
    id: '1',
    mediaFile: "https://media.begenuin.com/temp_video/30197054-a506-4b0b-bc0e-408f0b11865d_1657721930523.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '2',
    mediaFile: "https://media.begenuin.com/temp_video/dd70964f-8030-4096-b1ff-5532e4504301_1657724407582.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '3',
    mediaFile: "https://media.begenuin.com/temp_video/30197054-a506-4b0b-bc0e-408f0b11865d_1657721932451.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '4',
    mediaFile: "https://media.begenuin.com/temp_video/92c4842f-f50a-40ae-8e54-ebdde3e56e78_1657723429913.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '5',
    mediaFile: "https://media.begenuin.com/temp_video/dd70964f-8030-4096-b1ff-5532e4504301_1657726083127.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '6',
    mediaFile: "https://media.begenuin.com/temp_video/66d76298-6701-44bc-aa31-955a4e6beb78_1668766768262.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '7',
    mediaFile: "https://media.begenuin.com/temp_video/d362eec2-215d-41be-b20f-e6ba94676999_1657726097820.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '8',
    mediaFile: "https://media.begenuin.com/temp_video/957fef21-47f3-4f8d-8dda-eb06e6625d90_1664978397782.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '9',
    mediaFile: "https://media.begenuin.com/temp_video/5ad17381-6c77-4b51-b071-24dc39ff7e0f_1657721838849.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '10',
    mediaFile: "https://media.begenuin.com/temp_video/c0f8f8db-a1b2-4c8b-b121-d1e48de6a82b_1668766773823.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '11',
    mediaFile: "https://media.begenuin.com/temp_video/957fef21-47f3-4f8d-8dda-eb06e6625d90_1664978397782.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '12',
    mediaFile: "https://media.begenuin.com/temp_video/92c4842f-f50a-40ae-8e54-ebdde3e56e78_1657723429913.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '13',
    mediaFile: "https://media.begenuin.com/temp_video/dd70964f-8030-4096-b1ff-5532e4504301_1657724407582.mp4",
    w: 1080,
    h: 1920,
  },
  {
    id: '14',
    mediaFile: "https://media.begenuin.com/temp_video/c0f8f8db-a1b2-4c8b-b121-d1e48de6a82b_1668766773823.mp4",
    w: 1080,
    h: 1920,
  }
]

let agentId = 1;

class GenuinAgent {
  constructor(options) {
    this.bids = {};
    this.adServerUrl = 'http://localhost:8081'
    if (options) {
      if (options.adServerUrl) {
        debug('Using ad server url: ' + options.adServerUrl);
        this.adServerUrl = options.adServerUrl;
      }
    }
    this.agentId = agentId++;
  }

  type() {
    return 'GENUIN';
  }

  name() {
    return 'genuin-bid-agent-' + this.agentId;
  }

  getAdSystem() {
    return 'genuin-ad-server';
  }

  getAdServerUrl() {
    return this.adServerUrl;
  }

  getAdByCampaignId(cid) {
    let campaign = GENUIN_CAMPAIGNS.find(c => c.id === cid);
    return GENUIN_ADS.find(ad => ad.id === campaign.adid);
  }

  getCreativeByAdId(adid) {
    let ad = GENUIN_ADS.find(ad => ad.id === adid);
    let creative = GENUIN_CREATIVES.find(cr => cr.id === ad.crid);
    return creative;
  }

  getBids(imps) {
    let bids = [];
    imps.forEach(imp => {
      let deal = GENUIN_DEALS[Math.floor(Math.random() * GENUIN_DEALS.length)];
      let campaign = GENUIN_CAMPAIGNS.find(c => c.id === deal.cid);
      let ad = this.getAdByCampaignId(campaign.id);
      let creative = GENUIN_CREATIVES.find(cr => cr.id === ad.crid);
      let bidId = uuidv1() + '_' + imp.id;

      let mediaFile = `<MediaFile delivery="progressive" type="video/mp4" width="${creative.w}" height="${creative.h}" scalable="true"><![CDATA[${creative.mediaFile}]]></MediaFile>`;
      let tracking = `<Impression><![CDATA[${this.getAdServerUrl()}/track/?price=\${AUCTION_PRICE}]]></Impression>`;
      let adSystem = `<AdSystem>${this.getAdSystem()}</AdSystem><AdTitle>${ad.title}</AdTitle>`;
      let adDuration = new Date(ad.duration * 1000).toISOString().substr(11, 8);
      let videoAdMarkup = `<VAST version="2.0"><Ad id="${ad.id}"><InLine>${adSystem}<Creatives><Creative id="${creative.id}"><Linear><Duration>${adDuration}</Duration><MediaFiles>${mediaFile}</MediaFiles></Linear></Creative></Creatives>${tracking}</InLine></Ad></VAST>`;

      let bid = {
        id: bidId,
        status: 1,
        deal: deal.id,
        clearPrice: deal.clearPrice,
        impid: imp.id,
        price: deal.price,
        adid: ad.id,
        adm: videoAdMarkup,
        cid: campaign.id,
        crid: creative.id,
        nurl: `${this.getAdServerUrl()}/win?bid=${bidId}&agent=${this.name()}` + "&price=${AUCTION_PRICE}"
      };
      bids.push(bid);

      this.bids[bidId] = bid;
    });
    // debug('getBids(): %O', this.bids);
    return bids;
  }

  getBidById(id) {
    // debug('getBidById(): %O', this.bids);
    return this.bids[id];
  }
}

module.exports = GenuinAgent;
