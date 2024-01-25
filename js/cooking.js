window.onload = () => {
  const url = '../assets/json/gerechten.json';
  const instru1 = document.getElementById('js--instru1');
  const instru2 = document.getElementById('js--instru2');
  const instru3 = document.getElementById('js--instru3');

  async function fetchInstru(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  fetchInstru(url).then((data) => {
    console.log(data.gerechten);
    instru1.setAttribute('value', 
      "Gerecht: " + data.gerechten.gerecht
    );
    instru2.setAttribute('value', 
      "Ingredienten: " + "\n" + 
      "- " + data.gerechten.ingredienten[0] + "\n" +
      "- " + data.gerechten.ingredienten[1] + "\n" +
      "- " + data.gerechten.ingredienten[2]
    );
    instru3.setAttribute('value', 
      "Stappen: " + "\n" + 
      "- " + data.gerechten.stappen.stap1.naam + "\n" +
      "- " + data.gerechten.stappen.stap2.naam + "\n" +
      "- " + data.gerechten.stappen.stap3.naam + "\n" +
      "- " + data.gerechten.stappen.stap4.naam + "\n" +
      "- " + data.gerechten.stappen.stap5.naam
    );
  }).catch((error) => {
    console.error('Error outside async function: ', error);
  });
}