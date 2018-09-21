import React from "react";

/*
  Props:
    bgColor: string representing the color of the background of the img (can be hex color, rgb(r, g, b, a), or color name)
    textColor: string representing the color of the text in the button (can be hex color, rgb(r, g, b, a), or color name)
    imgSrc: string representing the location of the img used as the icon (can be in the form of URL, path location, or data representing image)
    textPadding: string representing padding to the left of the text, i.e. distance from the img (give px units)
*/

class Output extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHTMLOutput = () => {
    // html-output is an iframe canvas that displays html typed into the editor.  It only displays when html is the selected language
    //about: blank makes it so that the clear button will clear the html appropriately when pressed.  Otherwise, old content persists.
    const { runResult } = this.props;
    if (!runResult) {
      return null;
    }

    return (
      <iframe
        className="html-output"
        style={{ display: "flex", height: "92vh" }}
        srcDoc={this.props.runResult}
        src="about:blank"
        onLoad={e => {
          console.log(e);
        }}
      />
    );
  };

  renderPythonOutput = () => {
    // html-output is an iframe canvas that displays html typed into the editor.  It only displays when html is the selected language
    //about: blank makes it so that the clear button will clear the html appropriately when pressed.  Otherwise, old content persists.
    let { runResult } = this.props;

    if (!runResult) {
      return null;
    }

    return (
      <iframe
        className="html-output"
        style={{ display: "flex", height: "92vh" }}
        srcDoc={`<html> 
              <head> 
              <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js" type="text/javascript"></script> 
              <script src="http://www.skulpt.org/static/skulpt.min.js" type="text/javascript"></script> 
              <script src="http://www.skulpt.org/static/skulpt-stdlib.js" type="text/javascript"></script>
              <style>html,body: {margin:0, width:100%, height:100%}</style> 
              
              </head> 
              
              <body onload="runit()"> 
              
              <script type="text/javascript"> 
              // output functions are configurable.  This one just appends some text
              // to a pre element.
              function outf(text) { 
                  var mypre = document.getElementById("output"); 
                  mypre.innerHTML = mypre.innerHTML + text; 
              } 
              function builtinRead(x) {
                  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                          throw "File not found: '" + x + "'";
                  return Sk.builtinFiles["files"][x];
              }
              // Here's everything you need to run a python program in skulpt
              // grab the code from your textarea
              // get a reference to your pre element for output
              // configure the output function
              // call Sk.importMainWithBody()
              function runit() { 
                 var prog = document.getElementById("runResult").innerHTML  ; 
                 console.log(prog)
                 var mypre = document.getElementById("output"); 
                 mypre.innerHTML = ''; 
                 Sk.pre = "output";
                 Sk.configure({output:outf, read:builtinRead}); 
                 (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
                 var myPromise = Sk.misceval.asyncToPromise(function() {
                     return Sk.importMainWithBody("<stdin>", false, prog, true);
                 });
                 myPromise.then(function(mod) {
                     console.log('success');
                 },
                     function(err) {
                     console.log(err.toString());
                 });
              } 
              </script> 
              
              <h3>Try This</h3> 
              <form> 
              <button type="button" onclick="runit()">Replay</button> 
              </form> 
              <pre id="output"></pre> 
              <div style="display:none;" id="runResult">${runResult}</div>
              <!-- If you want turtle graphics include a canvas -->
              <div id="mycanvas"></div> 
              
              </body> 
              
              </html> `}
        src="about:blank"
        onLoad={e => {
          console.log(e);
        }}
      />
    );
  };

  renderProcessingOutput = () => {
    const { runResult } = this.props;

    if (!runResult) {
      return null;
    }

    return (
      <iframe
        className="html-output"
        style={{ display: "flex", height: "92vh" }}
        srcDoc={`<html><head>
              <style>html,body: {margin:0, width:100%}</style>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js"></script>
              </head><body><script type="text/javascript">${runResult}</script></body></html>`}
        src="about:blank"
        onLoad={e => {
          console.log(e);
        }}
      />
    );
  };

  renderOutput = () => {
    const { language, runResult } = this.props;
    switch (language) {
      case "Processing":
        return this.renderProcessingOutput();
      case "Javascript":
      case "C++":
      case "Java":
      case "HTML":
        return this.renderHTMLOutput();
      case "Python":
        return this.renderPythonOutput();
      default:
        return this.renderHTMLOutput();
    }
  };

  render() {
    //called deconstruction; pulling children, triggerLogin, ..., textPadding out of props
    const { clearOutput } = this.props;

    return (
      <div className="editor-output">
        <div className="editor-header">
          <div style={{ flex: "1 1 auto" }}> </div>
          <div className="editor-run" onClick={clearOutput}>
            <button className="editor-run-button" style={{ backgroundColor: "#ec4848" }}>
              Clear
            </button>
          </div>
        </div>
        <div className="editor-output-content">{this.renderOutput()}</div>
      </div>
    );
  }
}

export default Output;