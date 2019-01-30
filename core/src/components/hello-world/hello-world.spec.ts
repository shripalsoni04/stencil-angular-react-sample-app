import { HelloWorldComponent } from './hello-world';

describe('hello-world component', () => {

  it('getText method should return correct output', () => {
    const helloWorldComp = new HelloWorldComponent();
    helloWorldComp.first = 'Shripal';
    helloWorldComp.last = 'Soni';

    expect(helloWorldComp.getText()).toBe('Shripal Soni');
  });
});
