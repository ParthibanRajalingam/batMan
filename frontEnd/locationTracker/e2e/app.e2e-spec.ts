import { LocationTrackerPage } from './app.po';

describe('location-tracker App', () => {
  let page: LocationTrackerPage;

  beforeEach(() => {
    page = new LocationTrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
