import React, { Component } from 'react'

import './App.css'
import { tryTalk, crypt } from './utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'olá, eu sou uma mensagem de teste',
      link: '',
    }
    this.createMessageLink = this.createMessageLink.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
  }

  componentDidMount() {
    tryTalk()
  }

  updateMessage(event) {
    this.setState({ message: event.target.value })
  }

  createMessageLink() {
    const message = crypt(this.state.message)
    const link = `./?${message}`
    this.setState({ link })
  }

  render() {
    return (
      <div className="App">
        <title>
          Messengers
        </title>
        <span>
          Leave a message for your friends.
          Using Google's voice.
        </span>
        <span id="legal">
          This page will read the message contained in the link that was passed to you.
          The content of the message is the responsibility of the person who sent it.
          And not from this site. When you create a message use with responsibility.
        </span>
        <textarea value={this.state.message} onChange={this.updateMessage} />
        <button onClick={this.createMessageLink}>
          generate message
        </button>
        <a href={this.state.link}>
          message link
        </a>
      </div>
    )
  }
}

export default App
