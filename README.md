
Responsive Table from json

List of contents:
    1.Description
    2.Installation or how to run
    3.First load


1)simple table, taking data from two js after calculating some ceil, is responsive ,you can sort and filter all column

2)Before you can take data from json to this app you have to disable web security in a browser or add to your server listed sites header(Access-Control-Allow-Origin: [your-domain-name]) for disable security in chrome run this in console: 
”C:\Program Files (x86)\Google\Chrome\Application\chrome.exe” —-disable-web-security —-disable-gpu —-user-data-dir=~/chromeTemp

3)settimeout in line 26 in myjs.js is set to 500ms you can change this depend off how fast you want
