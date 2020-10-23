import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import React from 'react';
import Form from 'react-bootstrap/Form';

const synthesis = window.speechSynthesis;

const VoiceSelect = ({ voiceName, onChange }) => {
  const [voiceList, setVoiceList] = React.useState([]);
  const [voiceTotal, setVoiceTotal] = React.useState(0);

  React.useEffect(() => {
    if (synthesis.getVoices().length !== voiceTotal) {
      const voices = groupBy(synthesis.getVoices(), 'lang');
      setVoiceList(voices);
      setVoiceTotal(synthesis.getVoices().length);
    }
  }, [synthesis.getVoices()]);

  const onChangeHandler = React.useCallback((event) => onChange(event.target.value), []);

  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Select Voice</Form.Label>
      <Form.Control as="select" value={voiceName} onChange={onChangeHandler}>
        {map(voiceList, (voices, lang) => (
          <optgroup key={lang} label={lang}>
            {map(voices, (voice) => (<option key={voice.name} value={voice.name}>{voice.name}</option>))}
          </optgroup>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default VoiceSelect;
