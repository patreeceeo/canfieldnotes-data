export interface Section {
  depth: string;
  value: string;
  children?: Section[];
}

export interface LessonLookup {
  lessonName: string;
  internalName: string;
}

export interface ResourceMetadata {
  title: string,
  description: string,
  resource: string
}

export interface DocFile {
  toc: Section[];
  default: string;
}

export interface LessonFile {
  lesson?: any;
  solved?: any;
  markdown?: string;
}

function noThrow<T>(x: Promise<T>): Promise<T | undefined> {
  return x.catch(() => undefined);
}

export interface IndexItem {
  resource?: string;
  title?: string;
  description: string;
  lastUpdate?: string;
}
export async function getIndex(lang: string): Promise<Array<IndexItem>> {
  return await Promise.all([
    import(`../langs/${lang}/index.json`)
  ]);
}

export async function getDocFile(
  lang: string,
  resource: string
): Promise<DocFile> {
  return await import(`../langs/${lang}/n/${resource}.mdx`);
}

export async function getGuideDirectory(
  lang: string
): Promise<ResourceMetadata[] | undefined> {
  const directory = await noThrow(
    import(`../langs/${lang}/guides/directory.json`)
  );
  return directory?.default;
}

export async function getTutorial(
  lang: string,
  lesson: string
): Promise<LessonFile | undefined> {
  const [lessonFiles, solved, markdown] = await Promise.all([
    noThrow(import(`../langs/${lang}/tutorials/${lesson}/lesson.json`)),
    noThrow(import(`../langs/${lang}/tutorials/${lesson}/solved.json`)),
    noThrow(import(`../langs/${lang}/tutorials/${lesson}/lesson.md`)),
  ]);
  return {
    lesson: lessonFiles?.default,
    solved: solved?.default,
    markdown: markdown?.default,
  };
}

export async function getTutorialDirectory(
  lang: string
): Promise<LessonLookup[] | undefined> {
  const directory = await noThrow(
    import(`../langs/${lang}/tutorials/directory.json`)
  );
  return directory?.default;
}
