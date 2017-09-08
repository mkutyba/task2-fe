import { AppPage } from './app.po';

describe('task2-fe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display menu element', () => {
    page.navigateTo();
    expect(page.getMenuElement()).not.toBe(null);
  });
});
