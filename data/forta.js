const airdrop = {
   name: 'forta',
   is_listed_defillama: 'false',
   chain: 'ethereum',
   expiry: 1663255800,
   contract: '0x988a7bc24a9d0fa49989fb9734bda30f55760ceb',
   token: '0x41545f8b9472d758bb669ed8eaeeecd7a9c4ec29',
   gecko: 'forta',
   method: 'additionalClaims',
}

function run(userAddress) {

  const merkle = new web3.eth.Contract(dotdotabi, airdrop.contract);
  return (await merkle.methods[airdrop.method](userAddress).encodeABI() > 0) ? true : false

}
