import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Speech from './components/Speech';
import VoiceSelect from './components/VoiceSelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const App = () => {
  const [text, setText] = React.useState('');
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [shouldRepeat, setShouldRepeat] = React.useState(true);
  const [voiceName, setVoiceName] = React.useState('Karen');
  const [volume, setVolume] = React.useState(0.5);
  const [rate, setRate] = React.useState(1);

  const handleClick = React.useCallback(() => setIsSpeaking((prevState) => !prevState), []);

  const handleSpeakEnd = () => {
    if (!shouldRepeat) return setIsSpeaking(false);
  };

  return (
    <Container className="inspire-me__container">
      <Row>
        <Col className="inspire-me__header">Text to Speech</Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Enter text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <Form.Group>
            <Form.Label>Repeat</Form.Label>
            <Form.Check
              type="checkbox"
              checked={shouldRepeat}
              onChange={(event) => setShouldRepeat(event.target.checked)}
            />
          </Form.Group>
        </Col>

        <Col sm={3}>
          <VoiceSelect voiceName={voiceName} onChange={(value) => setVoiceName(value)} />
        </Col>

        <Col sm={3}>
          <Form.Group>
            <Form.Label>Volume</Form.Label>
            <Form.Control
              type="range"
              value={volume}
              onChange={(event) => setVolume(+event.target.value)}
              min={0}
              max={1}
              step={0.01}
            />
          </Form.Group>
        </Col>

        <Col sm={3}>
          <Form.Group>
            <Form.Label>Playback Speed</Form.Label>
            <Form.Control
              type="range"
              value={rate}
              onChange={(event) => setRate(+event.target.value)}
              min={0}
              max={2}
              step={0.01}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant={isSpeaking ? 'warning' : 'primary'} onClick={handleClick}>
            {isSpeaking ? 'Silence!!' : 'Speak!!'}
          </Button>
        </Col>
      </Row>

      <Speech
        text={text}
        isSpeaking={isSpeaking}
        shouldRepeat={shouldRepeat}
        voiceName={voiceName}
        volume={volume}
        rate={rate}
        onSpeakEnd={handleSpeakEnd}
      />
    </Container>
  );
};

export default App;
