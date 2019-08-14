let convertMessage = (message) => {
  let messageParameter = message.split(':')
  let messageLookUp = {
    required: 'This is required',
    email: 'It must be a valid email',
    min: 'It must be at least <param-1>',
    unique: '<field-name> already taken'
  }
  let messageText
  if(typeof messageLookUp[messageParameter[0]] !== 'undefined'){
    messageText = messageLookUp[messageParameter[0]]
    let parameters = messageParameter.length > 1 ? messageParameter[1].split(',') : []
    // TODO things like min
    for(let x = 0; x < parameters.length; x++){
      messageText = messageText.replace('<param-' + 1 + '>', parameters[x])
    }
  }else{
    messageText = messageParameter[0]
  }
  return messageText
}
export default {
  convertMessage: convertMessage,
  renderValidationError: (errorMessages) => {
    let validationErrorMessage = {}
    for(let error in errorMessages){
      let messageText = ''
      for(let x = 0; x < errorMessages[error].length; x++){
        console.log(errorMessages[error][x])
        messageText += convertMessage(errorMessages[error][x]) + ' '
      }
      validationErrorMessage[error] = { type: 'error', message: messageText }
    }
    return validationErrorMessage
  }
}
