const fs = require('fs');
let msg = fs.readFileSync(0, 'utf8').trim();
const prefixMatch = msg.match(/^\d+:\s*(.*)/);
if (prefixMatch) {
  let coreMsg = prefixMatch[1];
  if (coreMsg.match(/^(init|install|configure Tailwind|set up folder)/)) {
    msg = 'chore: ' + coreMsg;
  } else if (coreMsg.match(/^(import|set up global|build typography|configure global layout)/)) {
    msg = 'style: ' + coreMsg;
  } else {
    msg = 'feat: ' + coreMsg;
  }
}
console.log(msg);
