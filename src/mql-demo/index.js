const mql = require("@microlink/mql");
const { JSDOM } = require("jsdom");

(async () => {
  const url = (num) =>
    `https://zhoukou.anjuke.com/sale/chuanhui-q-dxqzk/p${num}/`;
  async function spider(num) {
    const _url =
      num == 0 ? "https://zhoukou.anjuke.com/sale/chuanhui-q-dxqzk" : url(num);
    console.log(_url);
    const { data } = await mql(_url, {
      retry: 5,
      data: {
        list: {
          selectorAll: ".list-main>.list-left>.list>.property",
        },
      },
    });
    const list = [];
    for (let index = 0; index < data.list.length; index++) {
      const item = data.list[index];
      const dom = new JSDOM(item);
      const tagClass = ".property-content-title-othertag-ad";
      const infoClass = ".property-content-info-comm";
      const priceTotalClass = ".property-price-total";
      const priceAveClass = ".property-price-average";
      const infoContentClass = ".property-content-info";
      if (!dom.window.document.querySelector(tagClass)) {
        const info = dom.window.document.querySelector(infoClass);
        const xiaoqu = info.querySelector(".property-content-info-comm-name");
        const address = info.querySelector(
          ".property-content-info-comm-address"
        );
        const pTotal = dom.window.document.querySelector(priceTotalClass);
        const pAve = dom.window.document.querySelector(priceAveClass);
        const infoContent = dom.window.document.querySelector(infoContentClass);
        const huxing = infoContent.querySelector(
          ".property-content-info-attribute"
        );
        const infoTexts = infoContent.querySelectorAll(
          ".property-content-info-text"
        );
        list.push({
          commName: xiaoqu.textContent,
          commAddress: address.textContent,
          totalPrice: pTotal.textContent,
          avePrice: pAve.textContent,
          huxing: huxing.textContent,
          area: infoTexts[1].textContent,
          direction: infoTexts[2].textContent,
        });
      }
    }
    require("fs").writeFile(
      require("path").resolve(__dirname, `zk.east.second-${num}.json`),
      JSON.stringify(list),
      (err) => {
        if (!err) {
          console.log("done");
        }
      }
    );
  }

  for (let index = 0; index < 19; index++) {
    await spider(index);
  }
})();
