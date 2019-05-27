let convertMessage = (message) => {
  let messageParameter = message.split(':')
  let messageLookUp = {
    required: 'It is required',
    email: 'It must be a valid email',
    min: 'It must be at least <param-1>',
    unique: 'Is already taken'
  }
  let messageText = messageLookUp[messageParameter[0]]

  let parameters = messageParameter.length > 1 ? messageParameter[1].split(',') : []
  //TODO things like min
  for(let x = 0; x < parameters.length; x++){
    messageText = messageText.replace('<param-' + 1 + '>', parameters[x])
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
        messageText += convertMessage(errorMessages[error][x]) + '. '
      }
      validationErrorMessage[error] = {type: 'error', message: messageText}
    }
    return validationErrorMessage
  }
}