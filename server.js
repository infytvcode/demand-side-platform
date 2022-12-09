const DSPEngine = require('./index.js');
const MockAgent = require('./agents/mock.js');
const GenuinAgent = require('./agents/genuin.js');

const engine = new DSPEngine();
let url = process.env.ADSERVER_URL || "http://" + (process.env.MYIP || 'localhost') + ":" + (process.env.PORT || 8081);
engine.addAgent(new MockAgent({ adServerUrl: url }));
engine.addAgent(new GenuinAgent({ adServerUrl: url }));
engine.listen(process.env.PORT || 8081);