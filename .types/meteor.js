type IMeteorSettings = {
  settings: {
    public: {
      googleMapsApiKey: string,
    }
  }
};

declare module "meteor/meteor" {
  declare var Meteor: IMeteorSettings;
}