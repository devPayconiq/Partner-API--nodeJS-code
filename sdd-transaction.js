var fs = require('fs');
var ursa = require('ursa');
var trim = require('trim');

var signer = ursa.createSigner("sha256");
var verifier = ursa.createVerifier("sha256");
var privateKey = ursa.createPrivateKey(fs.readFileSync('./private-key-path/private.pem'));
var publicKey = ursa.createPublicKey(fs.readFileSync('./public-key-path/public.pub'));

var originId = "589b19c08ce5ed0001773e64";
var originIBAN = "NL97ABNA0469132912";
var targetId = "589b12578ce5ed0001773e61";
var targetIBAN = "NL91ABNA0417164300";
var amount = "10";
var currency = "EUR";
var partnerId = "589b0ebb6eb9ed0001b706e9";
var transactionSignature = partnerId + originId + originIBAN + amount + currency;

//console.log(transactionSignature);
signer.update(transactionSignature, "utf8");
var signature = signer.sign(privateKey, "base64");
console.log(signature);
verifier.update(transactionSignature, "utf8");
var verified = verifier.verify(publicKey, signature, "base64");
console.log(verified);