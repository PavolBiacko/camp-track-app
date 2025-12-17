**⚠️ Upozornenie:** Tento súbor `README.md` bol automaticky vygenerovaný umelou inteligenciou na základe postupu priloženej bakalárskej práce.

---

# 🏕️ Camp-Track-App

Aplikácia Camp-Track-App slúži na sledovanie a správu aktivít v kempe, s back-endom nasadeným na platforme Supabase.

## 🚀 Spustenie aplikácie

Pre úspešné spustenie je potrebné spustiť iba front-end. Aplikácia je určená pre mobilné zariadenia s operačným systémom **Android** (možno použiť aj emulátor cez Android Studio).

---

## 1. Požiadavky

Pred spustením akéhokoľvek variantu aplikácie si pripravte nasledovné:

- **Mobilné zariadenie Android** alebo spustený emulátor (cez Android Studio).
- **USB kábel** pre pripojenie k počítaču (pre produkčnú verziu).

---

## 2. Produkčná Verzia (Inštalácia finálneho balíka)

Tento postup slúži na inštaláciu finálneho aplikačného balíka (`.apks`) priamo do vášho mobilného zariadenia pomocou ADB a nástroja Bundletool.

### A. Príprava Prostredia

1.  **Povolenie Ladania USB (USB Debugging):**

    - V mobilnom zariadení otvorte `Nastavenia` (Settings).
    - Prejdite do sekcie `Možnosti pre vývojárov` (Developer Options).
    - Zapnite prepínač **Ladanie USB** (USB Debugging).
    - _(Ak nevidíte Možnosti pre vývojárov, 7-krát kliknite na Číslo zostavy (Build Number) v sekcii Informácie o telefóne (About Phone) na jeho odomknutie.)_

2.  **Inštalácia Javy (JDK):**

    - Nainštalujte **Java Development Kit (JDK) verzie 11 alebo novšej** (odporúča sa v21.0.9, ktorú vyžaduje Bundletool). Ak máte len staršiu Javu 8, spúšťanie zlyhá s chybou `UnsupportedClassVersionError`.

3.  **SDK Platform Tools (ADB):**
    - Stiahnite si **SDK Platform tools** (v36.0.0).
    - **Dôležité:** Uistite sa, že ste správne nastavili **systémovú premennú PATH** tak, aby bolo možné spustiť príkaz **`adb devices`** z ľubovoľného miesta v termináli. Toto overí prepojenie mobilného zariadenia s počítačom.

### B. Inštalácia

1.  Uistite sa, že sa v termináli nachádzate v priečinku, ktorý obsahuje súbory:

    - `bundletool-all-1.18.2.jar`
    - `camp-track-app.apks`

2.  Spustite nasledujúci príkaz. Nástroj `bundletool` automaticky vygeneruje a prenesie optimálne `.apk` súbory do pripojeného mobilného zariadenia prostredníctvom ADB.

    ```bash
    java -jar .\bundletool-all-1.18.2.jar install-apks --apks=.\camp-track-app.apks
    ```

3.  Po úspešnom dokončení by mala byť aplikácia viditeľná v zozname aplikácií na vašom zariadení.

---

## 3. Vývojárska Verzia (Spustenie v Docker Kontajneri)

Tento postup slúži na spustenie aplikácie vo virtualizovanom prostredí pomocou Dockeru, čo je ideálne pre vývoj a testovanie, kde sú zmeny aplikácie okamžite viditeľné.

### A. Požiadavky

- Nainštalujte **Docker** (v25.0.3).
- Nainštalujte **základný `.apk` súbor** priložený v prílohe do zariadenia s operačným systémom Android.

### B. Spustenie

1.  V termináli sa uistite, že sa nachádzate v **koreňovom priečinku projektu**, kde sa na prvej úrovni nachádza súbor `Dockerfile`.

2.  Vytvorte obraz aplikácie (Docker Image). Tento proces môže trvať niekoľko minút:

    ```bash
    docker build -t camp-track-app .
    ```

3.  Spustite aplikáciu vo virtualizovanom prostredí (Docker Container):

    ```bash
    docker run -it -v /dev/urandom:/dev/random --name camp-track-app camp-track-app
    ```

    - Ak sa zobrazí výzva: `The package @expo/ngrok@^4.1.0 is required to use tunnels, would you like to install it globally?`, odpovedzte **yes**.

4.  Po spustení aplikácie v kontajneri naskenujte mobilným zariadením **zobrazený QR kód**. Mobilná aplikácia sa načíta a spustí.
