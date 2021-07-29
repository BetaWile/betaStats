# Discord Moderasyon Bot


 - [Discord Moderasyon Bot](https://github.com/beT4w/bet4Moderation)
      - [Kurulum](#kurulum)
      - [İçerikler](#İçerikler)
      - [İletişim](#İletişim)
      - [FAQ](#faq)

<div align="center">
   <a href="https://github.com/BetaWile">
      <img src="https://betaaa.has-a-hot.mom/55orRHk8J.gif">
   </a>
</div>

# Kurulum
* İlk olarak bilgisayarına [Node JS](https://nodejs.org/en/) indir.
* Bu projeyi zip halinde indir.
* Herhangi bir klasöre zipi çıkart.
* Daha sonra `beta\Settings` `"Config.json"`, `"Settings.json"` dosyalardaki bilgileri doldur.
* Sonra klasörün içerisinde bir `powershell` ya da `cmd` penceresi aç.
* ```npm install``` yazarak tüm modülleri kur.
* Kurulum bittikten sonra ```node beta.js``` yaz ve botu başlat.


## Botun İntentlerini Açmayı Unutma!
* [Açmak İçin Tıkla](https://discord.com/developers/applications)
<img src="https://cdn.discordapp.com/attachments/818953120452575322/851116463166849054/3P4KKB.png"/>

***Tadaaa 🎉. Artık moderasyon botun hazır. Dilediğin gibi kullanabilirsin.***


# Neden Yayınlandı?
 Kısaca neden böyle bir şey için uğraştığımı anlatayım. Hem kendimi geliştirmek daha iyi bilgilere ulaşmak hatalar alıp onları nasıl düzeltebileceğimi bulmak tecrübe kazanmak için hemde Türkiyede bu kadar iyi detaylı, özenli bir altyapının olmadığını fark edip bundan sizinde yaralanmanızı istedim.



## Settings.json Bilgi

```json
{
    "Token": "Token",
    "Prefix": ["Prefix"],
    "Status": "Bot_Durum"
}
```
## Config.json Bilgi
```json
{
  "Yetkili": {
    "abilityYT": "TÜMYETKİLERE_ERİŞİM_ROL",
    "banYT": "BANYETKİ_ROL",
    "jailYT": "JAİLYETKİ_ROL",
    "muteYT": "MUTEYETKİ_ROL",
    "vmuteYT": "VMUTEYETKİ_ROL"
  },
  "Roller": {
    "jailRol": "JAİL_ROL",
    "muteRol": "MUTE_ROL",
    "unregisterRol": "KAYITSIZ_ROL"

  },
  "Log": {
    "banLog": "BANLOG_KANAL",
    "jailLog": "JAİLLOG_KANAL",
    "muteLog": "MUTELOG_KANAL",
    "vmuteLog": "VMUTELOG_KANAL",
    "cezapuanlog": "CEZAPUANLOG_KANAL",
    "genelChat": "SOHBET_KANAL",
    "sesLog": "SESLOG_KANAL"
  },
  "Diger": {
     "yes": "<a:onay:867622163832766496> Şelinde emoji",
     "no":"<a:red:867622164810301460> Şelinde emoji "
  }
}
```


# İçerikler

## • Moderasyon {
  - [x] Ban / Unban
  - [x] Mute / Unmute
  - [x] VoiceMute / UnVoiceMute
  - [x] Jail / Unjail
  - [x] Sicil sistemi
  - [x] Cezapuan Sistemi
  - [x] Ses Log
  - [x] İltifat Sistemi
## };

# İletişim
* [Discord Profilim](https://discord.com/users/852615172673503262)
* [Discord Sunucum](https://discord.gg/58UAMVJTSH)

# FAQ
Sıkça sorulan sorulara buradan ulaşabilirsin.

**Q:** Altyapıyı geliştirilmeye devam edilecek mi?<br />
**A:** Eğer bir şeyler eklersem dolaylı yoldan burayada ekleyeceğim.

**Q:** İstek herhangi bir şey ekliyor musun?<br />
**A:** Eğer istediğin şey hoşuma giderse ve yapmaktan zevk alacaksam eklerim.

**Q:** Altyapı tamamen sanamı ait?<br />
**A:** Evet, tamamen bana ait. (:

**Q:** Hatalarla ilgileniyor musun?<br />
**A:** Proje içindeki hatalarla ilgileniyorum. Eğer bir hata ile karşılaşırsanız lütfen Discorddan benimle iletişim kurun. 


## NOT: Botta MIT lisansı bulunmaktadır. Bu botun dosyalarının benden habersiz paylaşılması/satılması durumunda gerekli işlemler yapılacaktır!
