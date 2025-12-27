export const getProjectDetailPath = (project) => {
  if (!project) {
    return undefined;
  }

  if (project.detailPath) {
    return project.detailPath;
  }

  const fallbackId =
    project.projectNo ?? project.productNo ?? project.projectId ?? project.id ?? project.slug;

  if (fallbackId === undefined || fallbackId === null || fallbackId === '') {
    return undefined;
  }

  return `/projects/${fallbackId}`;
};
