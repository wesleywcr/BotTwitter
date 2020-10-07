const puppeteer = require('puppeteer');

const username = 'Username';
const password = 'Passaword';



console.log('Bem vindo ao BotTwitter');
async function Ranking() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const Url = `https://spotifycharts.com/regional/br/daily/latest`;
  await page.goto(Url);


  const nameMusic = await page.evaluate(() => {
    return document.querySelector('.chart-table strong').innerText;
  });
  const nameSinger = await page.evaluate(() => {
    return document.querySelector('.chart-table span').innerText;
  });

  let rankingSpotify = `🎙️🎶 "${nameMusic} ${nameSinger}" é a música mais tocada do Dia !!!   `;
  await browser.close();
  console.log(rankingSpotify);
  await page.waitFor(3000);

  //Phrase Random
  async function RandomPhrase() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const UrlPrase = `https://lerolero.com/`;
    await page.goto(UrlPrase);


    const phrase = await page.evaluate(() => {
      return document.querySelector('.sentence.sentence-exited').innerText;
    });
    let PhraseTweet =
      `
        
    "💭💭 ${phrase} "`;
    await browser.close();
    console.log(PhraseTweet);
    await page.waitFor(3000);



    async function Twitter() {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      page.setViewport({
        width: 1280,
        height: 800,
        isMobile: false
      });


      const Urltwitter = `https://twitter.com/login?lang=pt`;
      await page.goto(Urltwitter, { waitUntil: 'networkidle2' });

      //LOGIN
      await page.type('input[name="session[username_or_email]"]', username, { delay: 25 });
      await page.type('input[name="session[password]"]', password, { delay: 25 });

      await page.click('div[data-testid="LoginForm_Login_Button"]');
      await page.waitFor(2000);

      //Tweet
      await page.waitFor('div[class="notranslate public-DraftEditor-content"]');
      await page.type('div[class="notranslate public-DraftEditor-content"]', rankingSpotify + PhraseTweet, { delay: 30 });
      await page.keyboard.press('Enter');

      await page.click('div[data-testid="tweetButtonInline" ', { delay: 25 });

      // await browser.close();
      console.log('Seu Tweet foi realizado com sucesso !!')
    }
    Twitter();
  }
  RandomPhrase();
}

Ranking();