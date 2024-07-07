import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '规范化 标准化',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        提升代码质量，降低项目维护难度
      </>
    ),
  },
  {
    title: '丰富的实用组件',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        提升研发效率
      </>
    ),
  },
  {
    title: '拥抱开源和云原生',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        提升组件功能的先进性，提升架构的兼容性和扩展性
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
