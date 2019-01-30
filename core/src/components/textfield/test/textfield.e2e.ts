import { newE2EPage } from '@stencil/core/testing';

describe('textfield', () => {
  it('should render textfield component', async () => {
    const page = await newE2EPage();
    await page.setContent('<sh-textfield></sh-textfield>');
    await page.waitForChanges();
    const el = await page.find('sh-textfield');
    expect(el).toBeDefined();
  });

  it('should emit change event on keypress in input field', async () => {
    const page = await newE2EPage();
    await page.setContent('<sh-textfield></sh-textfield>');
    const changEventSpy = await page.spyOnEvent('change');
    const input = await page.find('sh-textfield >>> input');
    await input.press('S');
    await input.press('h');
    await page.waitForChanges();
    expect(changEventSpy).toHaveReceivedEventDetail('Sh');
  });

  it('should set placeholder of textfield as per given in input', async () => {
    const page = await newE2EPage({
      html: '<sh-textfield placeholder="Enter Name"></sh-textfield>'
    });

    const input = await page.find('sh-textfield >>> input');
    expect(input.getAttribute('placeholder')).toBe('Enter Name');
  });

  it('should render label if label attribute/property is set', async () => {
    const page = await newE2EPage({
      html: '<sh-textfield label="First Name"></sh-textfield>'
    });

    const formGroupDiv = await page.find('sh-textfield >>> .form-group');
    expect(formGroupDiv.innerText).toContain('First Name');
  });
});
