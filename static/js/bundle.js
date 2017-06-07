var CothorityProtobuf = (function (protobuf) {
'use strict';

protobuf = 'default' in protobuf ? protobuf['default'] : protobuf;

var skeleton = '{"nested":{"cothority":{},"BlockLink":{"fields":{"Hash":{"rule":"required","type":"bytes","id":1},"Signature":{"rule":"required","type":"bytes","id":2}}},"LatestBlockRequest":{"fields":{"LatestID":{"rule":"required","type":"bytes","id":1}}},"LatestBlockResponse":{"fields":{"Update":{"rule":"repeated","type":"SkipBlock","id":1,"options":{"packed":false}}}},"RandomRequest":{"fields":{"index":{"rule":"required","type":"sint32","id":1}}},"RandomResponse":{"fields":{"R":{"rule":"required","type":"bytes","id":1},"T":{"rule":"required","type":"Transcript","id":2},"index":{"type":"sint32","id":3}},"nested":{"Transcript":{"fields":{"nodes":{"rule":"required","type":"sint32","id":1},"groups":{"rule":"required","type":"sint32","id":2},"purpose":{"rule":"required","type":"string","id":3},"time":{"rule":"required","type":"fixed64","id":4}}}}},"google":{"nested":{"protobuf":{"nested":{"Timestamp":{"fields":{"seconds":{"type":"int64","id":1},"nanos":{"type":"int32","id":2}}}}}}},"Roster":{"fields":{"id":{"type":"bytes","id":1},"list":{"rule":"repeated","type":"ServerIdentity","id":2,"options":{"packed":false}},"aggregate":{"type":"bytes","id":3}}},"ServerIdentity":{"fields":{"public":{"rule":"required","type":"bytes","id":1},"id":{"rule":"required","type":"bytes","id":2},"address":{"rule":"required","type":"string","id":3},"description":{"rule":"required","type":"string","id":4}}},"SignatureRequest":{"fields":{"message":{"rule":"required","type":"bytes","id":1},"roster":{"rule":"required","type":"Roster","id":2}}},"SignatureResponse":{"fields":{"hash":{"rule":"required","type":"bytes","id":1},"signature":{"rule":"required","type":"bytes","id":2}}},"SkipBlock":{"fields":{"Index":{"type":"sint32","id":1},"Height":{"type":"sint32","id":2},"MaximumHeight":{"type":"sint32","id":3},"BaseHeight":{"type":"sint32","id":4},"BackLinkIDs":{"rule":"repeated","type":"bytes","id":5,"options":{"packed":false}},"VerifierIDs":{"rule":"repeated","type":"bytes","id":6,"options":{"packed":false}},"ParentBlockID":{"type":"bytes","id":7},"GenesisID":{"type":"bytes","id":8},"Data":{"type":"bytes","id":9},"Roster":{"type":"Roster","id":10},"Hash":{"type":"bytes","id":11},"ForwardLink":{"rule":"repeated","type":"BlockLink","id":12,"options":{"packed":false}},"ChildSL":{"type":"bytes","id":13}}},"StatusResponse":{"fields":{"system":{"keyType":"string","type":"Status","id":1},"server":{"type":"ServerIdentity","id":2}},"nested":{"Status":{"fields":{"field":{"keyType":"string","type":"string","id":1}}}}},"StoreSkipBlockRequest":{"fields":{"LatestID":{"rule":"required","type":"bytes","id":1},"NewBlock":{"rule":"required","type":"SkipBlock","id":2}}},"StoreSkipBlockResponse":{"fields":{"Previous":{"rule":"required","type":"SkipBlock","id":1},"Latest":{"rule":"required","type":"SkipBlock","id":2}}}}}';

var Root = protobuf.Root;

/**
 * As we need to create a bundle, we cannot use the *.proto files and the a script will wrap
 * them in a skeleton file that contains the JSON representation that can be used in the js code
 */

var Root$1 = Root.fromJSON(JSON.parse(skeleton));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Base class for the protobuf library that provides helpers to encode and decode
 * messages according to a given model
 *
 * @author Gaylor Bosson (gaylor.bosson@epfl.ch)
 */

var CothorityProtobuf = function () {

  /**
   * @constructor
   */
  function CothorityProtobuf() {
    classCallCheck(this, CothorityProtobuf);

    this.root = Root$1;
  }

  /**
   * Encode a model to be transmitted over websocket
   * @param {String} name
   * @param {Object} fields
   * @returns {*|Buffer|Uint8Array}
   */


  createClass(CothorityProtobuf, [{
    key: 'encodeMessage',
    value: function encodeMessage(name, fields) {
      var model = this.getModel(name);

      // Create the message with the model
      var msg = model.create(fields);

      // Encode the message in a BufferArray
      return model.encode(msg).finish();
    }

    /**
     * Decode a message coming from a websocket
     * @param {String} name
     * @param {*|Buffer|Uint8Array} buffer
     */

  }, {
    key: 'decodeMessage',
    value: function decodeMessage(name, buffer) {
      var model = this.getModel(name);
      return model.decode(buffer);
    }

    /**
     * Return the protobuf loaded model
     * @param {String} name
     * @returns {ReflectionObject|?ReflectionObject|string}
     */

  }, {
    key: 'getModel',
    value: function getModel(name) {
      return this.root.lookup('' + name);
    }
  }]);
  return CothorityProtobuf;
}();

/**
 * Helpers to encode and decode messages of the Cothority
 *
 * @author Gaylor Bosson (gaylor.bosson@epfl.ch)
 */

var CothorityMessages = function (_CothorityProtobuf) {
  inherits(CothorityMessages, _CothorityProtobuf);

  function CothorityMessages() {
    classCallCheck(this, CothorityMessages);
    return possibleConstructorReturn(this, (CothorityMessages.__proto__ || Object.getPrototypeOf(CothorityMessages)).apply(this, arguments));
  }

  createClass(CothorityMessages, [{
    key: 'createSignatureRequest',


    /**
     * Create an encoded message to make a sign request to a cothority node
     * @param {Uint8Array} message - Message to sign stored in a Uint8Array
     * @param {Array} servers - list of ServerIdentity
     * @returns {*|Buffer|Uint8Array}
     */
    value: function createSignatureRequest(message, servers) {
      if (!(message instanceof Uint8Array)) {
        throw new Error("message must be a instance of Uint8Array");
      }

      var fields = {
        message: message,
        roster: {
          list: servers
        }
      };

      return this.encodeMessage('SignatureRequest', fields);
    }

    /**
     * Return the decoded response of a signature request
     * @param {*|Buffer|Uint8Array} response - Response of the Cothority
     * @returns {Object}
     */

  }, {
    key: 'decodeSignatureResponse',
    value: function decodeSignatureResponse(response) {
      response = new Uint8Array(response);

      return this.decodeMessage('SignatureResponse', response);
    }

    /**
     * Return the decoded response of a status request
     * @param {*|Buffer|Uint8Array} response - Response of the Cothority
     * @returns {*}
     */

  }, {
    key: 'decodeStatusResponse',
    value: function decodeStatusResponse(response) {
      response = new Uint8Array(response);

      return this.decodeMessage('StatusResponse', response);
    }

    /**
     * Create a message to store a new block
     * @param {Uint8Array} id - ID of the current latest block
     * @param {Array} servers - list of ServerIdentity
     * @returns {*|Buffer|Uint8Array}
     */

  }, {
    key: 'createStoreSkipBlockRequest',
    value: function createStoreSkipBlockRequest(id, servers) {
      if (!(id instanceof Uint8Array)) {
        throw new Error("message must be a instance of Uint8Array");
      }

      return this.encodeMessage('StoreSkipBlockRequest', {
        LatestID: id,
        NewBlock: {
          MaximumHeight: 1,
          BaseHeight: 1,
          Data: new Uint8Array([]),
          Roster: {
            list: servers
          }
        }
      });
    }

    /**
     * Return the decoded message of a store skip block request
     * @param {*|Buffer|Uint8Array} response - Response of the Cothority
     * @returns {*}
     */

  }, {
    key: 'decodeStoreSkipBlockResponse',
    value: function decodeStoreSkipBlockResponse(response) {
      response = new Uint8Array(response);

      return this.decodeMessage('StoreSkipBlockResponse', response);
    }

    /**
     * Create a message request to get the latest blocks of a skip-chain
     * @param {Uint8Array} id - ID of the genesis block of the skip-chain
     * @returns {*|Buffer|Uint8Array}
     */

  }, {
    key: 'createLatestBlockRequest',
    value: function createLatestBlockRequest(id) {
      if (!(id instanceof Uint8Array)) {
        throw new Error("message must be a instance of Uint8Array");
      }

      return this.encodeMessage('LatestBlockRequest', {
        LatestID: id
      });
    }

    /**
     * Return the decoded message of a latest block request
     * @param {*|Buffer|Uint8Array} response - Response of the Cothority
     * @returns {*}
     */

  }, {
    key: 'decodeLatestBlockResponse',
    value: function decodeLatestBlockResponse(response) {
      response = new Uint8Array(response);

      return this.decodeMessage('LatestBlockResponse', response);
    }

    /**
     * Create a message request to get a random number
     * @returns {*|Buffer|Uint8Array}
     */

  }, {
    key: 'createRandomMessage',
    value: function createRandomMessage() {
      return this.encodeMessage('RandomRequest');
    }

    /**
     * Return the decoded message of a random number request
     * @param {*|Buffer|Uint8Array} response - Response of the Cothority
     * @returns {*}
     */

  }, {
    key: 'decodeRandomResponse',
    value: function decodeRandomResponse(response) {
      response = new Uint8Array(response);

      return this.decodeMessage('RandomResponse', response);
    }
  }]);
  return CothorityMessages;
}(CothorityProtobuf);

/**
 * Singleton
 */


var index = new CothorityMessages();

return index;

}(protobuf));
