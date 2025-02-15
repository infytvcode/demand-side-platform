const debug = require('debug')('agent-mock');
const uuidv1 = require('uuid/v1');

const MOCK_DEALS = [
  {
    id: 'mock-deal-1',
    price: 20.5,
    cid: '1000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-2',
    price: 13.5,
    cid: '2000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-3',
    price: 15.5,
    cid: '3000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-4',
    price: 15.5,
    cid: '4000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-5',
    price: 22.5,
    cid: '5000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-6',
    price: 23.5,
    cid: '6000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-7',
    price: 11.5,
    cid: '7000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-8',
    price: 25.0,
    cid: '8000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-9',
    price: 35.8,
    cid: '9000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-10',
    price: 25.8,
    cid: '10000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-11',
    price: 15.8,
    cid: '11000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-12',
    price: 14.8,
    cid: '12000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-13',
    price: 23.8,
    cid: '13000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-14',
    price: 24.8,
    cid: '14000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-15',
    price: 29.90,
    cid: '15000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-16',
    price: 35.95,
    cid: '16000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-17',
    price: 40.18,
    cid: '17000',
    clearPrice: 0.9,
  },
  {
    id: 'mock-deal-18',
    price: 44.8,
    cid: '18000',
    clearPrice: 0.9,
  }
];

const MOCK_CAMPAIGNS = [
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
  },
  {
    id: '15000',
    adid: '15'
  },
  {
    id: '16000',
    adid: '16'
  },
  {
    id: '17000',
    adid: '17'
  },
  {
    id: '18000',
    adid: '18'
  }
];

const MOCK_ADS = [
  {
    id: '1',
    title: 'mock-ad-1',
    duration: 15,
    crid: '1',
  },
  {
    id: '2',
    title: 'mock-ad-2',
    duration: 15,
    crid: '2',
  },
  {
    id: '3',
    title: 'mock-ad-3',
    duration: 10,
    crid: '3',
  },
  {
    id: '4',
    title: 'mock-ad-4',
    duration: 15,
    crid: '4',
  },
  {
    id: '5',
    title: 'mock-ad-5',
    duration: 10,
    crid: '5',
  },
  {
    id: '6',
    title: 'mock-ad-6',
    duration: 15,
    crid: '6',
  },
  {
    id: '7',
    title: 'mock-ad-7',
    duration: 15,
    crid: '7',
  },
  {
    id: '8',
    title: 'mock-ad-8',
    duration: 15,
    crid: '8',
  },
  {
    id: '9',
    title: 'mock-ad-9',
    duration: 20,
    crid: '9',
  },
  {
    id: '10',
    title: 'mock-ad-10',
    duration: 15,
    crid: '10',
  },
  {
    id: '11',
    title: 'mock-ad-11',
    duration: 10,
    crid: '11',
  },
  {
    id: '12',
    title: 'mock-ad-12',
    duration: 20,
    crid: '12',
  },
  {
    id: '13',
    title: 'mock-ad-13',
    duration: 15,
    crid: '13',
  },
  {
    id: '14',
    title: 'mock-ad-14',
    duration: 10,
    crid: '14',
  },
  {
    id: '15',
    title: 'mock-ad-15',
    duration: 15,
    crid: '15',
  },
  {
    id: '16',
    title: 'mock-ad-16',
    duration: 15,
    crid: '16',
  },
  {
    id: '17',
    title: 'mock-ad-17',
    duration: 15,
    crid: '18',
  },
  {
    id: '18',
    title: 'mock-ad-18',
    duration: 15,
    crid: '18',
  }
]

const MOCK_CREATIVES = [
  {
    id: '1',
    mediaFile: "http://testcontent.eyevinn.technology/ads/stswe19-teaser-15sek.mp4",
    w: 1920, h: 1080,
  },
  {
    id: '2',
    mediaFile: "http://testcontent.eyevinn.technology/ads/apotea-15s.mp4",
    w: 1920, h: 1080,
  },
  {
    id: '3',
    mediaFile: "http://testcontent.eyevinn.technology/ads/grannyra-10s.mp4",
    w: 1920, h: 1080,
  },
  {
    id: '4',
    mediaFile: "http://testcontent.eyevinn.technology/ads/sff-15s.mp4",
    w: 1920, h: 1080,
  },
  {
    id: '5',
    mediaFile: "http://testcontent.eyevinn.technology/ads/alvedon-10s.mp4",
    w: 718, h: 404,
  },
  {
    id: '6',
    mediaFile: "http://testcontent.eyevinn.technology/ads/bromwel-15s.mp4",
    w: 718, h: 404,
  },
  {
    id: '7',
    mediaFile: "http://testcontent.eyevinn.technology/ads/mio-15s.mp4",
    w: 718, h: 404,
  },
  {
    id: '8',
    mediaFile: "http://testcontent.eyevinn.technology/ads/volvo-15s.mp4",
    w: 718, h: 404,
  },
  {
    id: '9',
    mediaFile: "http://testcontent.eyevinn.technology/ads/willys-20s.mp4",
    w: 718, h: 404,
  },
  {
    id: '10',
    mediaFile: "http://testcontent.eyevinn.technology/ads/sector-15s.mp4",
    w: 1024, h: 576,
  },
  {
    id: '11',
    mediaFile: "http://testcontent.eyevinn.technology/ads/kungsangen-10s.mp4",
    w: 1024, h: 576,
  },
  {
    id: '12',
    mediaFile: "http://testcontent.eyevinn.technology/ads/nipaxon-20s.mp4",
    w: 1024, h: 576,
  },
  {
    id: '13',
    mediaFile: "http://testcontent.eyevinn.technology/ads/specsavers-15s.mp4",
    w: 1024, h: 576,
  },
  {
    id: '14',
    mediaFile: "http://testcontent.eyevinn.technology/ads/coldzyme-10s.mp4",
    w: 1024, h: 576,
  },
  {
    id: '15',
    mediaFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    w: 1024, h: 576,
  },
  {
    id: '16',
    mediaFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    w: 1024, h: 576,
  },
  {
    id: '17',
    mediaFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    w: 1024, h: 576,
  },
  {
    id: '18',
    mediaFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    w: 1024, h: 576,
  }
]

let agentId = 1;

class MockAgent {
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
    return 'MOCK';
  }

  name() {
    return 'mock-bid-agent-' + this.agentId;
  }

  getAdSystem() {
    return 'mock-ad-server';
  }

  getAdServerUrl() {
    return this.adServerUrl;
  }

  getAdByCampaignId(cid) {
    let campaign = MOCK_CAMPAIGNS.find(c => c.id === cid);
    return MOCK_ADS.find(ad => ad.id === campaign.adid);
  }

  getCreativeByAdId(adid) {
    let ad = MOCK_ADS.find(ad => ad.id === adid);
    let creative = MOCK_CREATIVES.find(cr => cr.id === ad.crid);
    return creative;
  }

  getBids(imps) {
    let bids = [];
    imps.forEach(imp => {
      let deal = MOCK_DEALS[Math.floor(Math.random() * MOCK_DEALS.length)];
      let campaign = MOCK_CAMPAIGNS.find(c => c.id === deal.cid);
      let ad = this.getAdByCampaignId(campaign.id);
      let creative = MOCK_CREATIVES.find(cr => cr.id === ad.crid);
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

module.exports = MockAgent;
