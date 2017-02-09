var fs = require('fs');
var ursa = require('ursa');

var signer = ursa.createSigner("sha256");
var verifier = ursa.createVerifier("sha256");
var privateKey = ursa.createPrivateKey(fs.readFileSync('./private-key-path/private.pem'));
var publicKey = ursa.createPublicKey(fs.readFileSync('./public-key-path/public.pub'));

var transactionSignature = publicKey + privateKey;

signer.update(transactionSignature, "utf8");
var signature = signer.sign(privateKey, "base64");
console.log(signature);
verifier.update(transactionSignature, "utf8");
var verified = verifier.verify(publicKey, signature, "base64");
console.log(verified);