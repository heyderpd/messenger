import React, { Component } from 'react'

import './App.css'
import { tryTalk, crypt, getMessageFromURL, setMessageOnURL, copyLink } from './utils'

const defaultMessage = 'olá, eu sou uma mensagem de teste'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      played: false,
      message: '',
      link: '',
    }
    this.syncURLToState = this.syncURLToState.bind(this)
    this.syncStateToURL = this.syncStateToURL.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.createMessageLink = this.createMessageLink.bind(this)
    this.playMessage = this.playMessage.bind(this)
    this.copyLink = this.copyLink.bind(this)
  }

  async componentDidMount() {
    this.syncURLToState()
    await tryTalk(true)
    this.setState({ loading: false })
  }

  syncURLToState() {
    const message = getMessageFromURL() || defaultMessage
    this.setState({ message })
    this.createMessageLink(message)
  }

  syncStateToURL() {
    setMessageOnURL(this.state.message)
  }

  updateMessage(event) {
    const message = event.target.value
    setMessageOnURL(message)
    this.createMessageLink(message)
    this.setState({ message })
  }

  createMessageLink(msg) {
    const link = crypt(msg)
    this.setState({ link })
  }

  async playMessage() {
    await tryTalk()
    this.setState({ played: true })
  }

  async copyLink() {
    copyLink(this.state.link)
  }

  render() {
    if (this.state.loading) {
      return (
        <img src="loading.gif" alt="" height="42" width="42"></img>
      )
    }

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
        {this.state.played === false
          ?(
            <button id="play" onClick={this.playMessage}>
              <img src="play.png" alt="" height="100" width="100"></img>
            </button>
          )
          :[
            <textarea value={this.state.message} onChange={this.updateMessage} />,
            <button id="play" onClick={this.playMessage}>
              <img src="play.png" alt="" height="42" width="42"></img>
            </button>,
            <button onClick={this.copyLink}>
              <img src="copy.png" alt="copy message link"  height="42" width="42"></img>
            </button>,
            <input id="link"></input>,
          ]}
        <span id="version">
          version 0.1.2
        </span>
      </div>
    )
  }
}

export default App
