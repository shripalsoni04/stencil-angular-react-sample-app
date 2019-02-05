import { startCase } from 'lodash';

export const prepareWebComponentExampleReadmeFile = (exampleName: string, order: number) => (
`---
title: ${startCase(exampleName)}
order: ${order || 1}
---
`
);