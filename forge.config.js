
module.exports = {
  packagerConfig: {
    icon: __dirname + '/images/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'AstraEffect',
          homepage: 'https://astraeffect.com',
          icon: __dirname + '/images/icon.png',
        }
      }
    },
  ],
};