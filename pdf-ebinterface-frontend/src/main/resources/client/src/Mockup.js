import React from 'react';
import FileUp from './FileUp';


const Mockup = () => {

  return <div>
    <div className="top-section">
      <div>
        <div className="nav-section">
        </div>
        <header>
          <div id="location-info">
            <div className="header">
              <div className="container header__content">
                <div className="row">
                  <div className="col-sm-7 col-xs-12 header__content__flex">
                    <div className="header__logo">
                      <a href="https://www.wko.at/service/Startseite.html">
                        <img src="https://www.wko.at/service/templates/media/logo-wko.png-service" alt="WKO Logo"
                             title="WKO Logo"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="tfn">
          <div className="main" id="main-content">
            <div className="container">
              <div className="row">
                <div>
                  <div className="col-xs-12">
                    <div className="center">
                      <div>
                        <h1 className="pdf_generator"> PDF-Generator </h1>
                      </div>

                      <p className="alerts alert-infoe">
                        Wählen Sie eine XML-Datei aus, der Sie einen QR Code hinzufügen und direkt in PDF
                        umwandeln möchten. Tipp: Ziehen Sie das Dokument direkt auf die rot markierte Fläche.
                      </p>

                      < FileUp      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-section">
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-9 pull-right">
                <ul className="doormat footer__doormat" id="footer-doormat">
                  <li><h4>Meine Branche</h4>
                    <ul className="doormat__nav">
                      <li><a href="https://www.wko.at/branchen/w/bank-versicherung/start.html">Sparte Bank und
                        Versicherung</a></li>
                      <li><a href="https://www.wko.at/branchen/w/gewerbe-handwerk/start.html">Sparte Gewerbe und
                        Handwerk</a></li>
                      <li><a href="https://www.wko.at/branchen/w/handel/start.html">Sparte Handel</a></li>
                      <li><a href="https://www.wko.at/branchen/w/industrie/start.html">Sparte Industrie</a></li>
                      <li><a href="https://www.wko.at/branchen/w/information-consulting/start.html">Sparte Information
                        und Consulting</a></li>
                      <li><a href="https://www.wko.at/branchen/w/tourismus-freizeitwirtschaft/start.html">Sparte
                        Tourismus und Freizeitwirtschaft</a></li>
                      <li><a href="https://www.wko.at/branchen/w/transport-verkehr/start.html">Sparte Transport und
                        Verkehr</a></li>
                    </ul>
                  </li>
                  <li><h4>Themen</h4>
                    <ul className="doormat__nav">
                      <li><a href="https://www.wko.at/service/arbeitsrecht-sozialrecht/start.html">Arbeitsrecht und
                        Sozialrecht</a></li>
                      <li><a href="https://www.wko.at/service/aussenwirtschaft/start.html">Außenwirtschaft</a></li>
                      <li><a href="https://www.wko.at/service/bildung-lehre/start.html">Bildung und Lehre</a></li>
                      <li><a href="https://www.wko.at/service/gruendung-uebergabe/Gruendung-und-Uebergabe.html">Gründung
                        und Übergabe</a></li>
                      <li><a href="https://www.wko.at/service/innovation-technologie-digitalisierung/start.html">Innovation,
                        Technologie und Digitalisierung</a></li>
                      <li><a href="https://www.wko.at/service/netzwerke/start.html">Netzwerke</a></li>
                      <li><a href="https://www.wko.at/service/steuern/start.html">Steuern</a></li>
                      <li><a href="https://www.wko.at/service/umwelt-energie/start.html">Umwelt und Energie</a></li>
                      <li><a
                        href="https://www.wko.at/service/unternehmensfuehrung-finanzierung-foerderungen/start.html">Unternehmensführung,
                        Finanzierung und Förderungen</a></li>
                      <li><a href="https://www.wko.at/service/verkehr-betriebsstandort/start.html">Verkehr und
                        Betriebsstandort</a></li>
                      <li><a href="https://www.wko.at/service/wirtschaftsrecht-gewerberecht/start.html">Wirtschaftsrecht
                        und Gewerberecht</a></li>
                      <li><a href="https://www.wko.at/service/zahlen-daten-fakten/start.html">Zahlen, Daten, Fakten</a>
                      </li>
                    </ul>
                  </li>
                  <li><h4>Die Wirtschaftskammer</h4>
                    <ul className="doormat__nav">
                      <li><a href="https://www.wko.at/service/w/wirtschaftskammer.html">Die Organisation</a></li>
                      <li><a
                        href="https://www.wko.at/service/w/Informationen_fuer_die_Wirtschaftskammerwahlen_20151.html"
                        alt="Wirtschaftskammerwahlen" target="_blank"
                        rel="noopener noreferrer">Wirtschaftskammerwahlen</a></li>
                      <li><a href="https://www.wko.at/Content.Node/kampagnen/Karriereportal-WKW/index.html"
                             alt="Jobs und Karriere" target="_blank" rel="noopener noreferrer">Jobs und Karriere</a>
                      </li>
                      <li><a href="https://www.wko.at/service/w/grundumlagen-wien.html" alt="Rechtliches"
                             target="_blank" rel="noopener noreferrer">Rechtliches</a></li>
                      <li><a href="https://www.wko.at/service/w/Wir-ueber-uns-2.html" alt="Wissenswertes"
                             target="_blank" rel="noopener noreferrer">Wissenswertes</a></li>
                      <li><a href="https://www.wko.at/service/w/So-erreichen-Sie-uns.html" alt="Kontakt und Anfahrt"
                             target="_blank" rel="noopener noreferrer">Kontakt und Anfahrt</a></li>
                    </ul>
                  </li>
                  <li><h4>Kontakt</h4>
                    <ul className="doormat__nav">
                      <li>Service-GmbH der Wirtschaftskammer Österreich</li>
                      <li>Wiedner Hauptstraße 63. Postfach 126. A-1045 Wien</li>
                      <li>T +43(0)5 90 900-5050</li>
                      <li>F +43(0)5 90 900-236</li>
                      <li><a href="mailto:mservice@wko.at">mservice@wko.at</a></li>
                    </ul>
                  </li>

                </ul>
              </div>
              <a href="https://www.wko.at/service/Startseite.html">
                <div className="col-md-3 text-center wko-wuerfel"></div>
              </a>
            </div>
          </div>
          <div className="footer__meta">
            <div className="container">
              <div className="row">
                <div className="col-med-9">
                  <ul className="footer__meta__navlist">
                    <li><a href="https://www.wko.at/service/Austrian-Economic-Chambers.html">Englisch</a></li>
                    <li><a href="https://www.wko.at/service/Offenlegung_Wien1.html" target="_blank"
                           rel="noopener noreferrer">Offenlegung</a></li>
                    <li><a
                      href="https://www.wko.at/service/Datenschutzerklaerung---Cookie-Richtlinie.html">Datenschutz</a>
                    </li>
                    <li>© 2017 WKO</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="panel-group panel-group--global" role="tablist" id="footer-collapse">
              <div className="panel global-panel">
                <div className="collapse" id="footer-portals">
                  <div className="container" role="tab">
                    <a aria-expanded="false" aria-controls="footer-portals" href="https://www.wko.at#footer-portals"
                       data-toggle="collapse" className="collapsed collapse-close " data-parent="#footer-portals">
                      <span className="sr-only">Schließen</span>
                      <svg className="icon icon-close"></svg>
                    </a>
                    <div className="row row-eq-height">
                      <div className="col-md-4">
                        <div className="global-panel__content">
                          <ul className="link-list">
                            <li><strong>WKO.at</strong></li>
                            <li><a href="https://webshop.wko.at/" target="_blank" rel="noopener noreferrer">Webshop</a>
                            </li>
                            <li><a href="https://eservice.wko.at/" target="_blank"
                                   rel="noopener noreferrer">E-Services</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="global-panel__content">
                          <ul className="link-list">
                            <li><a href="https://news.wko.at/" target="_blank" rel="noopener noreferrer">news.wko.at</a>
                            </li>
                            <li><a href="http://www.wko.tv/" target="_blank" rel="noopener noreferrer">WKO.tv</a></li>
                            <li><a href="http://www.wifi.at/" target="_blank" rel="noopener noreferrer">WIFI</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="global-panel__content">
                          <ul className="link-list">
                            <li><a href="https://firmen.wko.at/" target="_blank" rel="noopener noreferrer">WKO Firmen
                              A-Z</a></li>
                            <li><a href="https://wkis.wko.at/benutzerverwaltung/" target="_blank"
                                   rel="noopener noreferrer">WKO Benutzerverwaltung</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

  </div>
};

export default Mockup;
