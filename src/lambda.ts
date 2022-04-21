exports.handler = async function handler (input: any) {
  console.log('𝝺 triggered!')
  console.log('Input: ', JSON.stringify(input))

  return {
    'statusCode': 200,
    'nodeVersion': process.version
  }
}