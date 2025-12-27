import { getProjectDetailPath } from './projectPaths';
import { getProjectThumbnail, resolveProjectImageUrl } from './projectMedia';

const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'number') {
    return value;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const calculateDaysLeft = (fundEndDate) => {
  if (!fundEndDate) {
    return 0;
  }

  const endDate = new Date(fundEndDate);
  if (Number.isNaN(endDate.getTime())) {
    return 0;
  }

  const today = new Date();
  const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

export const mapProjectSummary = (project) => {
  if (!project) {
    return null;
  }

  const projectNo =
    project.productNo ?? project.projectNo ?? project.projectId ?? project.id ?? project.slug;
  if (projectNo === undefined || projectNo === null) {
    return null;
  }

  const goal = toNumber(project.targetAmount ?? project.goal);
  const current = toNumber(project.currentAmount ?? project.current);
  const daysLeft =
    typeof project.daysLeft === 'number'
      ? Math.max(0, project.daysLeft)
      : calculateDaysLeft(project.fundEndDate);

  return {
    id: projectNo,
    title: project.productTitle ?? project.title ?? '프로젝트',
    category: project.category ?? '기타',
    image: getProjectThumbnail(
      project,
      resolveProjectImageUrl(project.image || project.heroImage || ''),
    ),
    current,
    goal,
    backers: project.backers ?? project.supporterCount ?? project.funding?.backers ?? 0,
    daysLeft,
    detailPath: getProjectDetailPath({ ...project, productNo: projectNo }),
  };
};

export const mapProjectListResponse = (projects = []) => {
  if (!Array.isArray(projects)) {
    return [];
  }

  return projects.map(mapProjectSummary).filter((project) => project !== null);
};
