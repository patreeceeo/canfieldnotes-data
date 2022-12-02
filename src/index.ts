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

export async function getIndex(lang: string): Promise<DocFile[]> {
  const paths = [
    `../langs/${lang}/r3.mdx`,
  ]
  const promises = paths.map((path) => import(path))
  return await Promise.all(promises);
}

export async function getDoc(
  lang: string,
  resource?: string
): Promise<DocFile | undefined> {
  return await noThrow(import(`../langs/${lang}/guides/${resource}.md`));
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
