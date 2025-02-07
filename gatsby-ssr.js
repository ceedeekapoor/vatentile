const React = require("react")

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <script
      key="jquery"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    />,
    <script
      key="touchswipe"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js"
    />
  ])

  setPostBodyComponents([
    <script key="maze-game" src="/script.js" />
  ])
}
