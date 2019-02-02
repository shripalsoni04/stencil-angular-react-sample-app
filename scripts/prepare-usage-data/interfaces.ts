export class ExampleData {
  title: string;
  folderName: string;
  description: string;
  sortOrder: number = 1; 
  angular?: { code: string };
  react?: { code: string };
  vanilla: { code: string };
}

export class UsageData {
  folderName: string;
  examples: ExampleData[] = [];

  constructor(folderName: string) {
    this.folderName = folderName;
  }
}
