import React from 'react';
import { AutoSizer } from 'react-virtualized';

import {
  consonantsByName as calConsonants,
  vowelsByName as calVowels,
  diacriticsByName as calDiacritics
} from 'cal-code-util';
import { toIpa } from 'cal-ipa';
import { toPhonetic } from 'cal-phonetic';
import { toSedra } from 'cal-sedra';
import { toEstrangela } from 'cal-estrangela';
import { toHebrew } from 'cal-hebrew';
import { toWesternSyriac as toSyriac } from 'cal-syriac';
import { toArabic } from 'cal-arabic';
import { Container, Table, Row, Col } from 'reactstrap';
import Expander from './Expander';

export default class Help extends React.PureComponent {
  render = () => (
    <Expander>
      <AutoSizer disableWidth>
        {({ height }) => (
          <Container
            style={{
              width: '100%',
              maxWidth: '100%',
              height,
              overflow: 'auto'
            }}
          >
            <p>
              Welcome to Peshitta Web Application. Project home is found at{' '}
              <a
                href="https://github.com/peshitta/peshitta"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                https://github.com/peshitta/peshitta
              </a>{' '}
              . To read quick updates about the app or post questions or
              feedback, follow{' '}
              <a
                href="https://www.twitter.com/peshittap"
                target="_blank"
                rel="noopener noreferrer"
              >
                @peshittap
              </a>{' '}
              at
              <a
                href="https://www.twitter.com/peshittap"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://i.imgur.com/tXSoThF.png"
                  alt="@peshittap"
                  title="@peshittap"
                  style={{ maxWidth: '100%' }}
                />
              </a>
              or{' '}
              <a
                href="https://gitter.im/peshitta/Lobby?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://badges.gitter.im/peshitta/peshitta.svg"
                  alt="Gitter"
                  title="Join the chat at https://gitter.im/peshitta/Lobby"
                />
              </a>
            </p>
            <p>
              Follow IPA or Latin links for each letter to learn its
              pronunciation. All Aramaic consonants are common to Standard
              Arabic as well, except for{' '}
              <a
                title="Voiced velar stop"
                href="https://en.wikipedia.org/wiki/Voiced_velar_stop"
              >
                Gamal
              </a>{' '}
              which is pronounced as Egyptian{' '}
              <a title="Jeem" href="https://en.wiktionary.org/wiki/%D8%AC">
                Jeem
              </a>.
            </p>
            <p>
              For vowel pronunciation follow the links for each individual vowel
              or see{' '}
              <a href="https://en.wikipedia.org/wiki/IPA_vowel_chart_with_audio">
                IPA vowel chart with audio
              </a>{' '}
              .
            </p>
            <Row>
              <Col>
                Consonants
                <Table responsive hover bordered>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', fontWeight: 'normal' }}>
                        <a
                          href="http://cal.huc.edu/searching/fullbrowser.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          CAL
                        </a>
                      </th>
                      <th title="ܐ">{calConsonants.alaph}</th>
                      <th title="ܒ">{calConsonants.beth}</th>
                      <th title="ܓ">{calConsonants.gamal}</th>
                      <th title="ܕ">{calConsonants.dalath}</th>

                      <th title="ܗ">{calConsonants.he}</th>
                      <th title="ܘ">{calConsonants.waw}</th>
                      <th title="ܙ">{calConsonants.zayn}</th>

                      <th title="ܚ">{calConsonants.heth}</th>
                      <th title="ܛ">{calConsonants.teth}</th>
                      <th title="ܝ">{calConsonants.yod}</th>

                      <th title="ܟ">{calConsonants.kaph}</th>
                      <th title="ܠ">{calConsonants.lamadh}</th>
                      <th title="ܡ">{calConsonants.mim}</th>
                      <th title="ܢ">{calConsonants.nun}</th>

                      <th title="ܣ">{calConsonants.semkath}</th>
                      <th title="ܥ">{calConsonants.e}</th>
                      <th title="ܦ">{calConsonants.pe}</th>
                      <th title="ܨ">{calConsonants.sadhe}</th>

                      <th title="ܩ">{calConsonants.qoph}</th>
                      <th title="ܪ">{calConsonants.resh}</th>
                      <th title="ܫ">{calConsonants.shin}</th>
                      <th title="ܬ">{calConsonants.taw}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="http://www.ipachart.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          IPA
                        </a>
                      </td>
                      <td title="ܐ">{toIpa(calConsonants.alaph)}</td>
                      <td title="ܒ">
                        <a
                          title="Voiced bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiced_bilabial_stop"
                        >
                          {toIpa(calConsonants.beth)}
                        </a>
                      </td>
                      <td title="ܓ">
                        <a
                          title="Voiced velar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_velar_stop"
                        >
                          {toIpa(calConsonants.gamal)}
                        </a>
                      </td>
                      <td title="ܕ">
                        <a
                          title="Voiced alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_stops#Alveolar"
                        >
                          {toIpa(calConsonants.dalath)}
                        </a>
                      </td>

                      <td title="ܗ">
                        <a
                          title="Voiceless glottal fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_glottal_fricative"
                        >
                          {toIpa(calConsonants.he)}
                        </a>
                      </td>
                      <td title="ܘ">
                        <a
                          title="Voiced labio-velar approximant"
                          href="https://en.wikipedia.org/wiki/Voiced_labio-velar_approximant"
                        >
                          {toIpa(calConsonants.waw)}
                        </a>
                      </td>
                      <td title="ܙ">
                        <a
                          title="Non-retracted alveolar"
                          href="https://en.wikipedia.org/wiki/Voiced_alveolar_fricative#Non-retracted_alveolar"
                        >
                          {toIpa(calConsonants.zayn)}
                        </a>
                      </td>

                      <td title="ܚ">
                        <a
                          title="Voiceless pharyngeal fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_pharyngeal_fricative"
                        >
                          {toIpa(calConsonants.heth)}
                        </a>
                      </td>
                      <td title="ܛ">
                        <a
                          title="Pharyngealized voiceless alveolar stop"
                          href="https://en.wikipedia.org/wiki/Pharyngealization#Stops"
                        >
                          {toIpa(calConsonants.teth)}
                        </a>
                      </td>
                      <td title="ܝ">
                        <a
                          title="Voiced palatal approximant"
                          href="https://en.wikipedia.org/wiki/Palatal_approximant#Palatal"
                        >
                          {toIpa(calConsonants.yod)}
                        </a>
                      </td>

                      <td title="ܟ">
                        <a
                          title="Voiceless velar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_velar_stop"
                        >
                          {toIpa(calConsonants.kaph)}
                        </a>
                      </td>
                      <td title="ܠ">
                        <a
                          title="Alveolar lateral approximant"
                          href="https://en.wikipedia.org/wiki/Dental,_alveolar_and_postalveolar_lateral_approximants#Alveolar"
                        >
                          {toIpa(calConsonants.lamadh)}
                        </a>
                      </td>
                      <td title="ܡ">
                        <a
                          title="Bilabial nasal"
                          href="https://en.wikipedia.org/wiki/Bilabial_nasal"
                        >
                          {toIpa(calConsonants.mim)}
                        </a>
                      </td>
                      <td title="ܢ">
                        <a
                          title="Alveolar nasal"
                          href="https://en.wikipedia.org/wiki/Dental,_alveolar_and_postalveolar_nasals#Alveolar"
                        >
                          {toIpa(calConsonants.nun)}
                        </a>
                      </td>

                      <td title="ܣ">
                        <a
                          title="Voiceless alveolar sibilant"
                          href="https://en.wikipedia.org/wiki/Voiceless_alveolar_fricative#Voiceless_alveolar_sibilant"
                        >
                          {toIpa(calConsonants.semkath)}
                        </a>
                      </td>
                      <td title="ܥ">
                        <a
                          title="Voiced pharyngeal fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_pharyngeal_fricative"
                        >
                          {toIpa(calConsonants.e)}
                        </a>
                      </td>
                      <td title="ܦ">
                        <a
                          title="Voiceless bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_bilabial_stop"
                        >
                          {toIpa(calConsonants.pe)}
                        </a>
                      </td>
                      <td title="ܨ">
                        <a
                          title="Pharyngealized voiceless alveolar sibilant"
                          href="https://en.wikipedia.org/wiki/Pharyngealization#Fricatives"
                        >
                          {toIpa(calConsonants.sadhe)}
                        </a>
                      </td>

                      <td title="ܩ">
                        <a
                          title="Voiceless uvular stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_uvular_stop"
                        >
                          {toIpa(calConsonants.qoph)}
                        </a>
                      </td>
                      <td title="ܪ">
                        <a
                          title="Voiced alveolar trill"
                          href="https://en.wikipedia.org/wiki/Dental,_alveolar_and_postalveolar_trills#Voiced_alveolar_trill"
                        >
                          {toIpa(calConsonants.resh)}
                        </a>
                      </td>
                      <td title="ܫ">
                        <a
                          title="Voiceless palato-alveolar sibilant"
                          href="https://en.wikipedia.org/wiki/Voiceless_palato-alveolar_sibilant"
                        >
                          {toIpa(calConsonants.shin)}
                        </a>
                      </td>
                      <td title="ܬ">
                        <a
                          title="Voiceless alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_dental_and_alveolar_stops#Alveolar"
                        >
                          {toIpa(calConsonants.taw)}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="https://en.wikipedia.org/wiki/Help:IPA/Latin"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Latin
                        </a>
                      </td>
                      <td title="ܐ">{toPhonetic(calConsonants.alaph)}</td>
                      <td title="ܒ">
                        <a
                          title="Voiced bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiced_bilabial_stop"
                        >
                          {toPhonetic(calConsonants.beth)}
                        </a>
                      </td>
                      <td title="ܓ">
                        <a
                          title="Voiced velar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_velar_stop"
                        >
                          {toPhonetic(calConsonants.gamal)}
                        </a>
                      </td>
                      <td title="ܕ">
                        <a
                          title="Voiced alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_stops#Alveolar"
                        >
                          {toPhonetic(calConsonants.dalath)}
                        </a>
                      </td>

                      <td title="ܗ">
                        <a
                          title="Voiceless glottal fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_glottal_fricative"
                        >
                          {toPhonetic(calConsonants.he)}
                        </a>
                      </td>
                      <td title="ܘ">
                        <a
                          title="Voiced labio-velar approximant"
                          href="https://en.wikipedia.org/wiki/Voiced_labio-velar_approximant"
                        >
                          {toPhonetic(calConsonants.waw)}
                        </a>
                      </td>
                      <td title="ܙ">
                        <a
                          title="Non-retracted alveolar"
                          href="https://en.wikipedia.org/wiki/Voiced_alveolar_fricative#Non-retracted_alveolar"
                        >
                          {toPhonetic(calConsonants.zayn)}
                        </a>
                      </td>

                      <td title="ܚ">
                        <a
                          title="Voiceless pharyngeal fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_pharyngeal_fricative"
                        >
                          {toPhonetic(calConsonants.heth)}
                        </a>
                      </td>
                      <td title="ܛ">
                        <a
                          title="Pharyngealized voiceless alveolar stop"
                          href="https://en.wikipedia.org/wiki/Pharyngealization#Stops"
                        >
                          {toPhonetic(calConsonants.teth)}
                        </a>
                      </td>
                      <td title="ܝ">
                        <a
                          title="voiced palatal approximant"
                          href="https://en.wikipedia.org/wiki/Palatal_approximant#Palatal"
                        >
                          {toPhonetic(calConsonants.yod)}
                        </a>
                      </td>

                      <td title="ܟ">
                        <a
                          title="Voiceless velar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_velar_stop"
                        >
                          {toPhonetic(calConsonants.kaph)}
                        </a>
                      </td>
                      <td title="ܠ">
                        <a
                          title="Alveolar lateral approximant"
                          href="https://en.wikipedia.org/wiki/Dental,_alveolar_and_postalveolar_lateral_approximants#Alveolar"
                        >
                          {toPhonetic(calConsonants.lamadh)}
                        </a>
                      </td>
                      <td title="ܡ">
                        <a
                          title="Bilabial nasal"
                          href="https://en.wikipedia.org/wiki/Bilabial_nasal"
                        >
                          {toPhonetic(calConsonants.mim)}
                        </a>
                      </td>
                      <td title="ܢ">
                        <a
                          title="Alveolar nasal"
                          href="https://en.wikipedia.org/wiki/Dental,_alveolar_and_postalveolar_nasals#Alveolar"
                        >
                          {toPhonetic(calConsonants.nun)}
                        </a>
                      </td>

                      <td title="ܣ">
                        <a
                          title="Voiceless alveolar sibilant"
                          href="https://en.wikipedia.org/wiki/Voiceless_alveolar_fricative#Voiceless_alveolar_sibilant"
                        >
                          {toPhonetic(calConsonants.semkath)}
                        </a>
                      </td>
                      <td title="ܥ">
                        <a
                          title="Voiced pharyngeal fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_pharyngeal_fricative"
                        >
                          {toPhonetic(calConsonants.e)}
                        </a>
                      </td>
                      <td title="ܦ">
                        <a
                          title="Voiceless bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_bilabial_stop"
                        >
                          {toPhonetic(calConsonants.pe)}
                        </a>
                      </td>
                      <td title="ܨ">
                        <a
                          title="Pharyngealized voiceless alveolar sibilant"
                          href="https://en.wikipedia.org/wiki/Pharyngealization#Fricatives"
                        >
                          {toPhonetic(calConsonants.sadhe)}
                        </a>
                      </td>

                      <td title="ܩ">
                        <a
                          title="Voiceless uvular stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_uvular_stop"
                        >
                          {toPhonetic(calConsonants.qoph)}
                        </a>
                      </td>
                      <td title="ܪ">
                        <a
                          title="Voiced alveolar trill"
                          href="https://en.wikipedia.org/wiki/Dental,_alveolar_and_postalveolar_trills#Voiced_alveolar_trill"
                        >
                          {toPhonetic(calConsonants.resh)}
                        </a>
                      </td>
                      <td title="ܫ">
                        <a
                          title="Voiceless palato-alveolar sibilant"
                          href="https://en.wikipedia.org/wiki/Voiceless_palato-alveolar_sibilant"
                        >
                          {toPhonetic(calConsonants.shin)}
                        </a>
                      </td>
                      <td title="ܬ">
                        <a
                          title="Voiceless alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_dental_and_alveolar_stops#Alveolar"
                        >
                          {toPhonetic(calConsonants.taw)}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="https://sedra.bethmardutho.org/about/fonts"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Sedra
                        </a>
                      </td>
                      <td title="ܐ">{toSedra(calConsonants.alaph)}</td>
                      <td title="ܒ">{toSedra(calConsonants.beth)}</td>
                      <td title="ܓ">{toSedra(calConsonants.gamal)}</td>
                      <td title="ܕ">{toSedra(calConsonants.dalath)}</td>

                      <td title="ܗ">{toSedra(calConsonants.he)}</td>
                      <td title="ܘ">{toSedra(calConsonants.waw)}</td>
                      <td title="ܙ">{toSedra(calConsonants.zayn)}</td>

                      <td title="ܚ">{toSedra(calConsonants.heth)}</td>
                      <td title="ܛ">{toSedra(calConsonants.teth)}</td>
                      <td title="ܝ">{toSedra(calConsonants.yod)}</td>

                      <td title="ܟ">{toSedra(calConsonants.kaph)}</td>
                      <td title="ܠ">{toSedra(calConsonants.lamadh)}</td>
                      <td title="ܡ">{toSedra(calConsonants.mim)}</td>
                      <td title="ܢ">{toSedra(calConsonants.nun)}</td>

                      <td title="ܣ">{toSedra(calConsonants.semkath)}</td>
                      <td title="ܥ">{toSedra(calConsonants.e)}</td>
                      <td title="ܦ">{toSedra(calConsonants.pe)}</td>
                      <td title="ܨ">{toSedra(calConsonants.sadhe)}</td>

                      <td title="ܩ">{toSedra(calConsonants.qoph)}</td>
                      <td title="ܪ">{toSedra(calConsonants.resh)}</td>
                      <td title="ܫ">{toSedra(calConsonants.shin)}</td>
                      <td title="ܬ">{toSedra(calConsonants.taw)}</td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="http://www.peshitta.org/initial/standard.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Estrangela
                        </a>
                      </td>
                      <td className="estrangela" title=")">
                        {toEstrangela(calConsonants.alaph)}
                      </td>
                      <td className="estrangela" title="b">
                        {toEstrangela(calConsonants.beth)}
                      </td>
                      <td className="estrangela" title="g">
                        {toEstrangela(calConsonants.gamal)}
                      </td>
                      <td className="estrangela" title="d">
                        {toEstrangela(calConsonants.dalath)}
                      </td>

                      <td className="estrangela" title="h">
                        {toEstrangela(calConsonants.he)}
                      </td>
                      <td className="estrangela" title="w">
                        {toEstrangela(calConsonants.waw)}
                      </td>
                      <td className="estrangela" title="z">
                        {toEstrangela(calConsonants.zayn)}
                      </td>

                      <td className="estrangela" title="x">
                        {toEstrangela(calConsonants.heth)}
                      </td>
                      <td className="estrangela" title="T">
                        {toEstrangela(calConsonants.teth)}
                      </td>
                      <td className="estrangela" title="y">
                        {toEstrangela(calConsonants.yod)}
                      </td>

                      <td className="estrangela" title="k">
                        {toEstrangela(calConsonants.kaph)}
                      </td>
                      <td className="estrangela" title="l">
                        {toEstrangela(calConsonants.lamadh)}
                      </td>
                      <td className="estrangela" title="m">
                        {toEstrangela(calConsonants.mim)}
                      </td>
                      <td className="estrangela" title="n">
                        {toEstrangela(calConsonants.nun)}
                      </td>

                      <td className="estrangela" title="s">
                        {toEstrangela(calConsonants.semkath)}
                      </td>
                      <td className="estrangela" title="(">
                        {toEstrangela(calConsonants.e)}
                      </td>
                      <td className="estrangela" title="p">
                        {toEstrangela(calConsonants.pe)}
                      </td>
                      <td className="estrangela" title="c">
                        {toEstrangela(calConsonants.sadhe)}
                      </td>

                      <td className="estrangela" title="q">
                        {toEstrangela(calConsonants.qoph)}
                      </td>
                      <td className="estrangela" title="r">
                        {toEstrangela(calConsonants.resh)}
                      </td>
                      <td className="estrangela" title="$">
                        {toEstrangela(calConsonants.shin)}
                      </td>
                      <td className="estrangela" title="t">
                        {toEstrangela(calConsonants.taw)}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="https://en.wikipedia.org/wiki/Hebrew_alphabet"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Hebrew
                        </a>
                      </td>
                      <td className="semitic" title=")">
                        {toHebrew(calConsonants.alaph)}
                      </td>
                      <td className="semitic" title="b">
                        {toHebrew(calConsonants.beth)}
                      </td>
                      <td className="semitic" title="g">
                        {toHebrew(calConsonants.gamal)}
                      </td>
                      <td className="semitic" title="d">
                        {toHebrew(calConsonants.dalath)}
                      </td>

                      <td className="semitic" title="h">
                        {toHebrew(calConsonants.he)}
                      </td>
                      <td className="semitic" title="w">
                        {toHebrew(calConsonants.waw)}
                      </td>
                      <td className="semitic" title="z">
                        {toHebrew(calConsonants.zayn)}
                      </td>

                      <td className="semitic" title="x">
                        {toHebrew(calConsonants.heth)}
                      </td>
                      <td className="semitic" title="T">
                        {toHebrew(calConsonants.teth)}
                      </td>
                      <td className="semitic" title="y">
                        {toHebrew(calConsonants.yod)}
                      </td>

                      <td className="semitic" title="k">
                        {toHebrew(calConsonants.kaph)}
                      </td>
                      <td className="semitic" title="l">
                        {toHebrew(calConsonants.lamadh)}
                      </td>
                      <td className="semitic" title="m">
                        {toHebrew(calConsonants.mim)}
                      </td>
                      <td className="semitic" title="n">
                        {toHebrew(calConsonants.nun)}
                      </td>

                      <td className="semitic" title="s">
                        {toHebrew(calConsonants.semkath)}
                      </td>
                      <td className="semitic" title="(">
                        {toHebrew(calConsonants.e)}
                      </td>
                      <td className="semitic" title="p">
                        {toHebrew(calConsonants.pe)}
                      </td>
                      <td className="semitic" title="c">
                        {toHebrew(calConsonants.sadhe)}
                      </td>

                      <td className="semitic" title="q">
                        {toHebrew(calConsonants.qoph)}
                      </td>
                      <td className="semitic" title="r">
                        {toHebrew(calConsonants.resh)}
                      </td>
                      <td className="semitic" title="$">
                        {toHebrew(calConsonants.shin)}
                      </td>
                      <td className="semitic" title="t">
                        {toHebrew(calConsonants.taw)}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="https://en.wikipedia.org/wiki/Syriac_alphabet"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Syriac
                        </a>
                      </td>
                      <td className="syriac" title=")">
                        {toSyriac(calConsonants.alaph)}
                      </td>
                      <td className="syriac" title="b">
                        {toSyriac(calConsonants.beth)}
                      </td>
                      <td className="syriac" title="g">
                        {toSyriac(calConsonants.gamal)}
                      </td>
                      <td className="syriac" title="d">
                        {toSyriac(calConsonants.dalath)}
                      </td>

                      <td className="syriac" title="h">
                        {toSyriac(calConsonants.he)}
                      </td>
                      <td className="syriac" title="w">
                        {toSyriac(calConsonants.waw)}
                      </td>
                      <td className="syriac" title="z">
                        {toSyriac(calConsonants.zayn)}
                      </td>

                      <td className="syriac" title="x">
                        {toSyriac(calConsonants.heth)}
                      </td>
                      <td className="syriac" title="T">
                        {toSyriac(calConsonants.teth)}
                      </td>
                      <td className="syriac" title="y">
                        {toSyriac(calConsonants.yod)}
                      </td>

                      <td className="syriac" title="k">
                        {toSyriac(calConsonants.kaph)}
                      </td>
                      <td className="syriac" title="l">
                        {toSyriac(calConsonants.lamadh)}
                      </td>
                      <td className="syriac" title="m">
                        {toSyriac(calConsonants.mim)}
                      </td>
                      <td className="syriac" title="n">
                        {toSyriac(calConsonants.nun)}
                      </td>

                      <td className="syriac" title="s">
                        {toSyriac(calConsonants.semkath)}
                      </td>
                      <td className="syriac" title="(">
                        {toSyriac(calConsonants.e)}
                      </td>
                      <td className="syriac" title="p">
                        {toSyriac(calConsonants.pe)}
                      </td>
                      <td className="syriac" title="c">
                        {toSyriac(calConsonants.sadhe)}
                      </td>

                      <td className="syriac" title="q">
                        {toSyriac(calConsonants.qoph)}
                      </td>
                      <td className="syriac" title="r">
                        {toSyriac(calConsonants.resh)}
                      </td>
                      <td className="syriac" title="$">
                        {toSyriac(calConsonants.shin)}
                      </td>
                      <td className="syriac" title="t">
                        {toSyriac(calConsonants.taw)}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: 'left' }}>
                        <a
                          href="https://en.wikipedia.org/wiki/Arabic_alphabet"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Arabic
                        </a>
                      </td>
                      <td className="semitic" title=")">
                        {toArabic(calConsonants.alaph)}
                      </td>
                      <td className="semitic" title="b">
                        {toArabic(calConsonants.beth)}
                      </td>
                      <td className="semitic" title="g">
                        {toArabic(calConsonants.gamal)}
                      </td>
                      <td className="semitic" title="d">
                        {toArabic(calConsonants.dalath)}
                      </td>

                      <td className="semitic" title="h">
                        {toArabic(calConsonants.he)}
                      </td>
                      <td className="semitic" title="w">
                        {toArabic(calConsonants.waw)}
                      </td>
                      <td className="semitic" title="z">
                        {toArabic(calConsonants.zayn)}
                      </td>

                      <td className="semitic" title="x">
                        {toArabic(calConsonants.heth)}
                      </td>
                      <td className="semitic" title="T">
                        {toArabic(calConsonants.teth)}
                      </td>
                      <td className="semitic" title="y">
                        {toArabic(calConsonants.yod)}
                      </td>

                      <td className="semitic" title="k">
                        {toArabic(calConsonants.kaph)}
                      </td>
                      <td className="semitic" title="l">
                        {toArabic(calConsonants.lamadh)}
                      </td>
                      <td className="semitic" title="m">
                        {toArabic(calConsonants.mim)}
                      </td>
                      <td className="semitic" title="n">
                        {toArabic(calConsonants.nun)}
                      </td>

                      <td className="semitic" title="s">
                        {toArabic(calConsonants.semkath)}
                      </td>
                      <td className="semitic" title="(">
                        {toArabic(calConsonants.e)}
                      </td>
                      <td className="semitic" title="p">
                        {toArabic(calConsonants.pe)}
                      </td>
                      <td className="semitic" title="c">
                        {toArabic(calConsonants.sadhe)}
                      </td>

                      <td className="semitic" title="q">
                        {toArabic(calConsonants.qoph)}
                      </td>
                      <td className="semitic" title="r">
                        {toArabic(calConsonants.resh)}
                      </td>
                      <td className="semitic" title="$">
                        {toArabic(calConsonants.shin)}
                      </td>
                      <td className="semitic" title="t">
                        {toArabic(calConsonants.taw)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                Vowels
                <Table responsive hover bordered>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', fontWeight: 'normal' }}>
                        CAL
                      </th>
                      <th title="ܐܲ">{calVowels.pthaha}</th>
                      <th title="ܐܵ">{calVowels.zqapha}</th>
                      <th title="ܐܹ">{calVowels.rbasa}</th>
                      <th title="ܝܼ">{calVowels.hbasa}</th>
                      <th title="ܘܼ">{calVowels.esasa}</th>
                      <th title="ܐܸ">{calVowels.zlama}</th>
                      <th title="ܘܿ">{calVowels.rwaha}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'left' }}>IPA</td>
                      <td title="ܐܲ">
                        <a
                          title="Open front unrounded"
                          href="https://en.wikipedia.org/wiki/Open_front_unrounded_vowel"
                        >
                          {toIpa(calVowels.pthaha)}
                        </a>
                      </td>
                      <td title="ܐܵ">
                        <a
                          title="Open back unrounded"
                          href="https://en.wikipedia.org/wiki/Open_back_unrounded_vowel"
                        >
                          {toIpa(calVowels.zqapha)}
                        </a>
                      </td>
                      <td title="ܐܹ">
                        <a
                          title="Close-mid front unrounded"
                          href="https://en.wikipedia.org/wiki/Close-mid_front_unrounded_vowel"
                        >
                          {toIpa(calVowels.rbasa)}
                        </a>
                      </td>
                      <td title="ܝܼ">
                        <a
                          title="Close front unrounded"
                          href="https://en.wikipedia.org/wiki/Close_front_unrounded_vowel"
                        >
                          {toIpa(calVowels.hbasa)}
                        </a>
                      </td>
                      <td title="ܘܼ">
                        <a
                          title="Close back rounded"
                          href="https://en.wikipedia.org/wiki/Close_back_rounded_vowel"
                        >
                          {toIpa(calVowels.esasa)}
                        </a>
                      </td>
                      <td title="ܐܸ">
                        <a
                          title="Open-mid front unrounded"
                          href="https://en.wikipedia.org/wiki/Open-mid_front_unrounded_vowel"
                        >
                          {toIpa(calVowels.zlama)}
                        </a>
                      </td>
                      <td title="ܘܿ">
                        <a
                          title="Close-mid back rounded"
                          href="https://en.wikipedia.org/wiki/Close-mid_back_rounded_vowel"
                        >
                          {toIpa(calVowels.rwaha)}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Latin</td>
                      <td title="ܐܲ">
                        <a
                          title="Open front unrounded"
                          href="https://en.wikipedia.org/wiki/Open_front_unrounded_vowel"
                        >
                          {toPhonetic(calVowels.pthaha)}
                        </a>
                      </td>
                      <td title="ܐܵ">
                        <a
                          title="Open back unrounded"
                          href="https://en.wikipedia.org/wiki/Open_back_unrounded_vowel"
                        >
                          {toPhonetic(calVowels.zqapha)}
                        </a>
                      </td>
                      <td title="ܐܹ">
                        <a
                          title="Close-mid front unrounded"
                          href="https://en.wikipedia.org/wiki/Close-mid_front_unrounded_vowel"
                        >
                          {toPhonetic(calVowels.rbasa)}
                        </a>
                      </td>
                      <td title="ܝܼ">
                        <a
                          title="Close front unrounded"
                          href="https://en.wikipedia.org/wiki/Close_front_unrounded_vowel"
                        >
                          {toPhonetic(calVowels.hbasa)}
                        </a>
                      </td>
                      <td title="ܘܼ">
                        <a
                          title="Close back rounded"
                          href="https://en.wikipedia.org/wiki/Close_back_rounded_vowel"
                        >
                          {toPhonetic(calVowels.esasa)}
                        </a>
                      </td>
                      <td title="ܐܸ">
                        <a
                          title="Open-mid front unrounded"
                          href="https://en.wikipedia.org/wiki/Open-mid_front_unrounded_vowel"
                        >
                          {toPhonetic(calVowels.zlama)}
                        </a>
                      </td>
                      <td title="ܘܿ">
                        <a
                          title="Close-mid back rounded"
                          href="https://en.wikipedia.org/wiki/Close-mid_back_rounded_vowel"
                        >
                          {toPhonetic(calVowels.rwaha)}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Sedra</td>
                      <td title="ܐܲ">{toSedra(calVowels.pthaha)}</td>
                      <td title="ܐܵ">{toSedra(calVowels.zqapha)}</td>
                      <td title="ܐܹ">{toSedra(calVowels.rbasa)}</td>
                      <td title="ܝܼ">{toSedra(calVowels.hbasa)}</td>
                      <td title="ܘܼ">{toSedra(calVowels.esasa)}</td>
                      <td title="ܐܸ">{toSedra(calVowels.zlama)}</td>
                      <td title="ܘܿ">{toSedra(calVowels.rwaha)}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Estrangela</td>
                      <td title="a" className="estrangela">
                        {toEstrangela(calConsonants.alaph + calVowels.pthaha)}
                      </td>
                      <td title="o" className="estrangela">
                        {toEstrangela(calConsonants.alaph + calVowels.zqapha)}
                      </td>
                      <td title="e" className="estrangela">
                        {toEstrangela(calConsonants.alaph + calVowels.rbasa)}
                      </td>
                      <td title="i" className="estrangela">
                        {toEstrangela(calConsonants.yod + calVowels.hbasa)}
                      </td>
                      <td title="u" className="estrangela">
                        {toEstrangela(calConsonants.waw + calVowels.esasa)}
                      </td>
                      <td title="E" className="estrangela">
                        {toEstrangela(calConsonants.alaph + calVowels.zlama)}
                      </td>
                      <td title="O" className="estrangela">
                        {toEstrangela(calConsonants.waw + calVowels.rwaha)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Hebrew</td>
                      <td title="a" className="semitic">
                        {toHebrew(calConsonants.alaph + calVowels.pthaha)}
                      </td>
                      <td title="o" className="semitic">
                        {toHebrew(calConsonants.alaph + calVowels.zqapha)}
                      </td>
                      <td title="e" className="semitic">
                        {toHebrew(calConsonants.alaph + calVowels.rbasa)}
                      </td>
                      <td title="i" className="semitic">
                        {toHebrew(calConsonants.yod + calVowels.hbasa)}
                      </td>
                      <td title="u" className="semitic">
                        {toHebrew(calConsonants.waw + calVowels.esasa)}
                      </td>
                      <td title="E" className="semitic">
                        {toHebrew(calConsonants.alaph + calVowels.zlama)}
                      </td>
                      <td title="O" className="semitic">
                        {toHebrew(calConsonants.waw + calVowels.rwaha)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Syriac</td>
                      <td title="a" className="syriac">
                        {toSyriac(calConsonants.alaph + calVowels.pthaha)}
                      </td>
                      <td title="o" className="syriac">
                        {toSyriac(calConsonants.alaph + calVowels.zqapha)}
                      </td>
                      <td title="e" className="syriac">
                        {toSyriac(calConsonants.alaph + calVowels.rbasa)}
                      </td>
                      <td title="i" className="syriac">
                        {toSyriac(
                          calConsonants.alaph +
                            calConsonants.yod +
                            calVowels.hbasa
                        )}
                      </td>
                      <td title="u" className="syriac">
                        {toSyriac(
                          calConsonants.alaph +
                            calConsonants.waw +
                            calVowels.esasa
                        )}
                      </td>
                      <td title="E" className="syriac">
                        {toSyriac(calConsonants.alaph + calVowels.zlama)}
                      </td>
                      <td title="O" className="syriac">
                        {toSyriac(
                          calConsonants.alaph +
                            calConsonants.waw +
                            calVowels.rwaha
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Arabic</td>
                      <td title="a" className="semitic">
                        {toArabic(calConsonants.alaph + calVowels.pthaha)}
                      </td>
                      <td title="o" className="semitic">
                        {toArabic(calConsonants.alaph + calVowels.zqapha)}
                      </td>
                      <td title="e" className="semitic">
                        {toArabic(calConsonants.alaph + calVowels.rbasa)}
                      </td>
                      <td title="i" className="semitic">
                        {toArabic(
                          calConsonants.alaph +
                            calConsonants.yod +
                            calVowels.hbasa
                        )}
                      </td>
                      <td title="u" className="semitic">
                        {toArabic(
                          calConsonants.alaph +
                            calConsonants.waw +
                            calVowels.esasa
                        )}
                      </td>
                      <td title="E" className="semitic">
                        {toArabic(calConsonants.alaph + calVowels.zlama)}
                      </td>
                      <td title="O" className="semitic">
                        {toArabic(
                          calConsonants.alaph +
                            calConsonants.waw +
                            calVowels.rwaha
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col>
                Diacritics
                <Table responsive hover bordered>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 'medium'
                        }}
                      >
                        CAL
                      </th>
                      <th title="ܕ݁">
                        {calConsonants.dalath + calDiacritics.qushaya}
                      </th>
                      <th title="ܕ݂">
                        {calConsonants.dalath + calDiacritics.rukkakha}
                      </th>
                      <th title="ܕ݇">
                        {calConsonants.dalath + calDiacritics.lineaOccultans}
                      </th>
                      <th title="ܕ̈">
                        {calConsonants.dalath + calDiacritics.seyame}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'left' }}>IPA</td>
                      <td title="ܕ݁">
                        <a
                          title="Voiced alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_stops#Alveolar"
                        >
                          {toIpa(calConsonants.dalath + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td title="ܕ݂">
                        <a
                          title="Voiced dental fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_fricative"
                        >
                          {toIpa(calConsonants.dalath + calDiacritics.rukkakha)}
                        </a>
                      </td>
                      <td title="ܕ݇">
                        {toIpa(
                          calConsonants.dalath + calDiacritics.lineaOccultans
                        )}
                      </td>
                      <td title="ܕ̈">
                        {toIpa(calConsonants.dalath + calDiacritics.seyame)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Latin</td>
                      <td title="ܕ݁">
                        <a
                          title="Voiced alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_stops#Alveolar"
                        >
                          {toPhonetic(
                            calConsonants.dalath + calDiacritics.qushaya
                          )}
                        </a>
                      </td>
                      <td title="ܕ݂">
                        <a
                          title="Voiced dental fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_fricative"
                        >
                          {toPhonetic(
                            calConsonants.dalath + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>
                      <td title="ܕ݇">
                        {toPhonetic(
                          calConsonants.dalath + calDiacritics.lineaOccultans
                        )}
                      </td>
                      <td title="ܕ̈">
                        {toPhonetic(
                          calConsonants.dalath + calDiacritics.seyame
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Sedra</td>
                      <td title="ܕ݁">
                        {toSedra(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td title="ܕ݂">
                        {toSedra(calConsonants.dalath + calDiacritics.rukkakha)}
                      </td>
                      <td title="ܕ݇">
                        {toSedra(
                          calConsonants.dalath + calDiacritics.lineaOccultans
                        )}
                      </td>
                      <td title="ܕ̈">
                        {toSedra(calConsonants.dalath + calDiacritics.seyame)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Estrangela</td>
                      <td title="'" className="estrangela">
                        {toEstrangela(
                          calConsonants.dalath + calDiacritics.qushaya
                        )}
                      </td>
                      <td title="," className="estrangela">
                        {toEstrangela(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </td>
                      <td title="_" className="estrangela">
                        {toEstrangela(
                          calConsonants.dalath + calDiacritics.lineaOccultans
                        )}
                      </td>
                      <td title="*" className="estrangela">
                        {toEstrangela(
                          calConsonants.dalath + calDiacritics.seyame
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Hebrew</td>
                      <td title="'" className="semitic">
                        {toHebrew(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td title="," className="semitic">
                        {toHebrew(calConsonants.dalath)}
                      </td>
                      <td title="_" className="semitic">
                        {toHebrew(calConsonants.dalath)}
                      </td>
                      <td title="*" className="semitic">
                        {toHebrew(calConsonants.dalath)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Syriac</td>
                      <td title="'" className="syriac">
                        {toSyriac(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td title="," className="syriac">
                        {toSyriac(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </td>
                      <td title="_" className="syriac">
                        {toSyriac(
                          calConsonants.dalath + calDiacritics.lineaOccultans
                        )}
                      </td>
                      <td title="*" className="syriac">
                        {toSyriac(calConsonants.dalath + calDiacritics.seyame)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'left' }}>Arabic</td>
                      <td title="'" className="semitic">
                        {toArabic(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td title="," className="semitic">
                        {toArabic(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </td>
                      <td title="_" className="semitic">
                        {toArabic(
                          calConsonants.dalath + calDiacritics.lineaOccultans
                        )}
                      </td>
                      <td title="*" className="semitic">
                        {toArabic(calConsonants.dalath + calDiacritics.seyame)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <a
                  href="https://en.wikipedia.org/wiki/Begadkefat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Begadkepat
                </a>
                <Table responsive hover bordered>
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        style={{
                          textAlign: 'left',
                          fontWeight: 'normal',
                          verticalAlign: 'top'
                        }}
                      >
                        CAL
                      </th>
                      <th>{calConsonants.beth + calDiacritics.qushaya}</th>
                      <th>{calConsonants.gamal + calDiacritics.qushaya}</th>
                      <th>{calConsonants.dalath + calDiacritics.qushaya}</th>
                      <th>{calConsonants.kaph + calDiacritics.qushaya}</th>
                      <th>{calConsonants.pe + calDiacritics.qushaya}</th>
                      <th>{calConsonants.taw + calDiacritics.qushaya}</th>

                      <th
                        rowSpan="2"
                        style={{
                          textAlign: 'left',
                          fontWeight: 'normal',
                          verticalAlign: 'top'
                        }}
                      >
                        Estrangela
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.beth + calDiacritics.qushaya
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.gamal + calDiacritics.qushaya
                        )}
                      </th>
                      <td className="estrangela">
                        {toEstrangela(
                          calConsonants.dalath + calDiacritics.qushaya
                        )}
                      </td>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.kaph + calDiacritics.qushaya
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(calConsonants.pe + calDiacritics.qushaya)}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.taw + calDiacritics.qushaya
                        )}
                      </th>
                    </tr>
                    <tr>
                      <th>{calConsonants.beth + calDiacritics.rukkakha}</th>
                      <th>{calConsonants.gamal + calDiacritics.rukkakha}</th>
                      <th>{calConsonants.dalath + calDiacritics.rukkakha}</th>
                      <th>{calConsonants.kaph + calDiacritics.rukkakha}</th>
                      <th>{calConsonants.pe + calDiacritics.rukkakha}</th>
                      <th>{calConsonants.taw + calDiacritics.rukkakha}</th>

                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.beth + calDiacritics.rukkakha
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.gamal + calDiacritics.rukkakha
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.kaph + calDiacritics.rukkakha
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.pe + calDiacritics.rukkakha
                        )}
                      </th>
                      <th className="estrangela">
                        {toEstrangela(
                          calConsonants.taw + calDiacritics.rukkakha
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="2" style={{ textAlign: 'left' }}>
                        IPA
                      </td>
                      <td>
                        <a
                          title="Voiced bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiced_bilabial_stop"
                        >
                          {toIpa(calConsonants.beth + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced velar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_velar_stop"
                        >
                          {toIpa(calConsonants.gamal + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_stops#Alveolar"
                        >
                          {toIpa(calConsonants.dalath + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless velar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_velar_stop"
                        >
                          {toIpa(calConsonants.kaph + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_bilabial_stop"
                        >
                          {toIpa(calConsonants.pe + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_dental_and_alveolar_stops#Alveolar"
                        >
                          {toIpa(calConsonants.taw + calDiacritics.qushaya)}
                        </a>
                      </td>

                      <td rowSpan="2" style={{ textAlign: 'left' }}>
                        Hebrew
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.beth + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.gamal + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.kaph + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.pe + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.taw + calDiacritics.qushaya)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Voiced labiodental fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_labiodental_fricative"
                        >
                          {toIpa(calConsonants.beth + calDiacritics.rukkakha)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced velar fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_velar_fricative"
                        >
                          {toIpa(calConsonants.gamal + calDiacritics.rukkakha)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced dental fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_fricative"
                        >
                          {toIpa(calConsonants.dalath + calDiacritics.rukkakha)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless velar fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_labiodental_fricative"
                        >
                          {toIpa(calConsonants.kaph + calDiacritics.rukkakha)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless labiodental fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_labiodental_fricative"
                        >
                          {toIpa(calConsonants.pe + calDiacritics.rukkakha)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless dental fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_dental_fricative"
                        >
                          {toIpa(calConsonants.taw + calDiacritics.rukkakha)}
                        </a>
                      </td>

                      <td className="semitic">
                        {toHebrew(calConsonants.beth + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.gamal + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toHebrew(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.kaph + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.pe + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toHebrew(calConsonants.taw + calDiacritics.rukkakha)}
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ textAlign: 'left' }}>
                        Latin
                      </td>
                      <td>
                        <a
                          title="Voiced bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiced_bilabial_stop"
                        >
                          {toPhonetic(
                            calConsonants.beth + calDiacritics.qushaya
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced velar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_velar_stop"
                        >
                          {toPhonetic(
                            calConsonants.gamal + calDiacritics.qushaya
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless velar stop"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_and_alveolar_stops#Alveolar"
                        >
                          {toPhonetic(
                            calConsonants.dalath + calDiacritics.qushaya
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title=""
                          href="https://en.wikipedia.org/wiki/Voiceless_velar_stop"
                        >
                          {toPhonetic(
                            calConsonants.kaph + calDiacritics.qushaya
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless bilabial stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_bilabial_stop"
                        >
                          {toPhonetic(calConsonants.pe + calDiacritics.qushaya)}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless alveolar stop"
                          href="https://en.wikipedia.org/wiki/Voiceless_dental_and_alveolar_stops#Alveolar"
                        >
                          {toPhonetic(
                            calConsonants.taw + calDiacritics.qushaya
                          )}
                        </a>
                      </td>

                      <td rowSpan="2" style={{ textAlign: 'left' }}>
                        Syriac
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.beth + calDiacritics.qushaya)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.gamal + calDiacritics.qushaya)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.kaph + calDiacritics.qushaya)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.pe + calDiacritics.qushaya)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.taw + calDiacritics.qushaya)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          title="Voiced labiodental fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_labiodental_fricative"
                        >
                          {toPhonetic(
                            calConsonants.beth + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced velar fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_velar_fricative"
                        >
                          {toPhonetic(
                            calConsonants.gamal + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiced dental fricative"
                          href="https://en.wikipedia.org/wiki/Voiced_dental_fricative"
                        >
                          {toPhonetic(
                            calConsonants.dalath + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless velar fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_labiodental_fricative"
                        >
                          {toPhonetic(
                            calConsonants.kaph + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless labiodental fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_labiodental_fricative"
                        >
                          {toPhonetic(
                            calConsonants.pe + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>
                      <td>
                        <a
                          title="Voiceless dental fricative"
                          href="https://en.wikipedia.org/wiki/Voiceless_dental_fricative"
                        >
                          {toPhonetic(
                            calConsonants.taw + calDiacritics.rukkakha
                          )}
                        </a>
                      </td>

                      <td className="syriac">
                        {toSyriac(calConsonants.beth + calDiacritics.rukkakha)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.gamal + calDiacritics.rukkakha)}
                      </td>
                      <td className="syriac">
                        {toSyriac(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.kaph + calDiacritics.rukkakha)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.pe + calDiacritics.rukkakha)}
                      </td>
                      <td className="syriac">
                        {toSyriac(calConsonants.taw + calDiacritics.rukkakha)}
                      </td>
                    </tr>
                    <tr>
                      <td rowSpan="2" style={{ textAlign: 'left' }}>
                        Sedra
                      </td>
                      <td>
                        {toSedra(calConsonants.beth + calDiacritics.qushaya)}
                      </td>
                      <td>
                        {toSedra(calConsonants.gamal + calDiacritics.qushaya)}
                      </td>
                      <td>
                        {toSedra(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td>
                        {toSedra(calConsonants.kaph + calDiacritics.qushaya)}
                      </td>
                      <td>
                        {toSedra(calConsonants.pe + calDiacritics.qushaya)}
                      </td>
                      <td>
                        {toSedra(calConsonants.taw + calDiacritics.qushaya)}
                      </td>

                      <td rowSpan="2" style={{ textAlign: 'left' }}>
                        Arabic
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.beth + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.gamal + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.dalath + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.kaph + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.pe + calDiacritics.qushaya)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.taw + calDiacritics.qushaya)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {toSedra(calConsonants.beth + calDiacritics.rukkakha)}
                      </td>
                      <td>
                        {toSedra(calConsonants.gamal + calDiacritics.rukkakha)}
                      </td>
                      <td>
                        {toSedra(calConsonants.dalath + calDiacritics.rukkakha)}
                      </td>
                      <td>
                        {toSedra(calConsonants.kaph + calDiacritics.rukkakha)}
                      </td>
                      <td>
                        {toSedra(calConsonants.pe + calDiacritics.rukkakha)}
                      </td>
                      <td>
                        {toSedra(calConsonants.taw + calDiacritics.rukkakha)}
                      </td>

                      <td className="semitic">
                        {toArabic(calConsonants.beth + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.gamal + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toArabic(
                          calConsonants.dalath + calDiacritics.rukkakha
                        )}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.kaph + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.pe + calDiacritics.rukkakha)}
                      </td>
                      <td className="semitic">
                        {toArabic(calConsonants.taw + calDiacritics.rukkakha)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="footer text-muted">
              <Col>
                <p>
                  This work makes use of the Syriac Electronic Data Retrieval
                  Archive (SEDRA) by George A. Kiraz, distributed by the{' '}
                  <a
                    href="https://sedra.bethmardutho.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Syriac Computing Institute.
                  </a>
                </p>
                <p>
                  For additional information on the structure of the Database,
                  see G. Kiraz, '<i>
                    Automatic Concordance Generation of Syriac Texts
                  </i>', in <i>VI Symposium Syriacum 1992</i>, ed. R. Lavenant,
                  Orientalia Christiana Analecta 247, Rome, 1994.
                </p>
              </Col>
            </Row>
          </Container>
        )}
      </AutoSizer>
    </Expander>
  );
}
