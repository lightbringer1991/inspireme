import find from 'lodash/find';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import React from 'react';
import PropTypes from 'prop-types';

class Speech extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    voiceName: PropTypes.string,
    volume: PropTypes.number,
    rate: PropTypes.number,
    isSpeaking: PropTypes.bool,
    shouldRepeat: PropTypes.bool,
    interval: PropTypes.number,
    onSpeakEnd: PropTypes.func,
    onSpeakPause: PropTypes.func,
    onSpeakResume: PropTypes.func,
    onSpeakBoundary: PropTypes.func,
    onSpeakStart: PropTypes.func,
  };

  static defaultProps = {
    isSpeaking: false,
    shouldRepeat: false,
    interval: 500,
    volume: 0.8,
  };

  state = {
    timeoutHandler: -1,
  };

  synthesis = window.speechSynthesis;

  utterance = new SpeechSynthesisUtterance(this.props.text);

  componentDidMount() {
    const { onSpeakPause, onSpeakResume, onSpeakBoundary, onSpeakStart } = this.props;
    this.utterance.onend = this.handleSpeakEnd;
    this.utterance.onpause = onSpeakPause || noop;
    this.utterance.onresume = onSpeakResume || noop;
    this.utterance.onboundary = onSpeakBoundary || noop;
    this.utterance.onstart = onSpeakStart || noop;
    this.utterance.voice = find(this.synthesis.getVoices(), { lang: 'en' });
    this.utterance.lang = 'en';
    this.utterance.pitch = 1.5;
    this.utterance.rate = 1;
    this.utterance.volume = this.props.volume;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSpeaking !== this.props.isSpeaking) {
      this.handleSpeak();
    }
  }

  handleSpeak = () => {
    const { isSpeaking, rate, text, voiceName, volume } = this.props;
    const voices = this.synthesis.getVoices();

    if (isSpeaking) {
      this.utterance.voice = voiceName ? find(voices, { name: voiceName }) : find(voices, { lang: 'en' });
      this.utterance.text = text;
      this.utterance.volume = volume;
      this.utterance.rate = rate;

      this.synthesis.cancel();
      this.synthesis.speak(this.utterance);
    }
  };

  handleSpeakEnd = (event) => {
    const { interval, isSpeaking, shouldRepeat, onSpeakEnd } = this.props;
    if (isSpeaking && shouldRepeat) setTimeout(this.handleSpeak, interval);
    if (isFunction(onSpeakEnd)) onSpeakEnd(event);
  };

  render() {
    if (!this.synthesis) {
      return 'Text to Speech is not available in your browser.';
    }

    return null;
  }
}

export default Speech;
