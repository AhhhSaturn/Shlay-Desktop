
module.exports = {
  packagerConfig: {
    icon: __dirname + '/images/icon',
    protocols: [
      {
        name: 'Shlay',
        schemes: ['shlay'],
      },
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        mimeType: ['x-scheme-handler/shlay'],
        options: {
          maintainer: 'AstraEffect',
          homepage: 'https://astraeffect.com',
          icon: __dirname + '/images/icon.png',
        }
      }
    },
  ],
};