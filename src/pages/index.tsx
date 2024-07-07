import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import GitHubButton from 'react-github-btn';
import styles from './index.module.css';

function FeatureCell(props) {
  return (
    <div className={styles.featureCell}>
      <div className={styles.featureSymbol}>
        ›
      </div>
      <div className={styles.featureContent}>
        <h3>{props.title}</h3>
        <p>{props.children}</p>
      </div>
    </div>
  );
}

function Testimonial(props) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>
        {props.title}
      </h4>
      <div className={styles.testimonial}>
        {props.children}
      </div>
      <div className={styles.author}>
        {props.author}<span className={styles.job}>, {props.job}</span>
      </div>
    </div>
  );
}

function Home(): JSX.Element {
  const context = useDocusaurusContext();
  return (
    <Layout  
      description="Elegant and complete microservice framework based on Golang.">
        <header className={styles.masthead}>
          <div className={styles.content}>
            <h1>A microservice framework for Go</h1>
            <h3>在几小时内构建原型，在几天内构建完整的应用程序。</h3>
            <div>
              <Link
                className={styles.btn}
                to={useBaseUrl("docs/getting-started/start")}>
                Get started
              </Link>
              <Link
                className={`${styles.btn} ${styles.btnSecondary}`}
                to="https://discord.gg/HtTfsxFN">
                Join the chat
              </Link>
            </div>
            <div className={styles.githubBtns}>
              <GitHubButton 
                href="https://github.com/go-eagle/eagle"
                data-icon="octicon-star" 
                data-size="large" 
                data-show-count="true" 
                aria-label="Star go-eagle/eagle on GitHub">
                  Star
              </GitHubButton>
              {/* <GitHubButton
                href="https://github.com/sponsors/LoicPoullain"
                data-icon="octicon-heart"
                data-size="large"
                aria-label="Sponsor @FoalTS on GitHub">
                  Sponsor
              </GitHubButton> */}
            </div>
          </div>
        </header>
        <section>
          <div className={styles.screenshotContainer}>
            <img src={useBaseUrl('images/home/screenshot.png')} alt="" />
          </div>
          {/* <div className={styles.metricsSection}>
            <div className={styles.metrics}>
              <div>
                <div className={styles.number}>2,100<span className={styles.plus}>+</span></div>
                <div className={styles.caption}>acceptance <br/> and unit tests</div>
              </div>
              <div>
                <div className={styles.number}>11,000<span className={styles.plus}>+</span></div>
                <div className={styles.caption}>lines of <br/>documentation</div>
              </div>
              <div>
                <div className={styles.number}>4 years</div>
                <div className={styles.caption}>of active <br/>development</div>
              </div>
            </div>
          </div> */}
          <div className={styles.allInOneSection}>
            <div className={styles.feature}>
              <div className={styles.col1}>
                <h2>All-in-One Framework 🚀</h2>
                <p>
                  基础已经存在。<strong>您不必从头开始重新构建所有内容</strong>，也不必查找并使第三方包协同工作，一切都包括在内。
                  <br/>
                  <br/>
                  但是，如果您愿意，您仍然可以导入和使用您喜欢的库。<strong>该框架是可扩展的</strong>。
                </p>
              </div>
              <div className={styles.col2}>
                <div className={styles.featuresWrapper}>
                  <div className={styles.featureRow}>
                    <FeatureCell title="CLI">
                      强大的命令行工具，可以生成service、repo、cache、model、proto等，无需手动编写，让你更加关注自生的业务逻辑。
                    </FeatureCell>
                    <FeatureCell title="Config">
                      支持读取多种数据格式，比如：yaml、toml、json、ini等。
                    </FeatureCell>
                  </div>
                  <div className={styles.featureRow}>
                    <FeatureCell title="日志">
                      支持多writer写入: file和console, 可以按时间配置日志切割方式；支持链路追踪格式，方便统一定位问题。
                    </FeatureCell>
                    <FeatureCell title="ORM">
                      基于GORM(v2)，支持链路追踪，开发过程中可以开启SQL输出模式，线上也可以开启慢SQL，让你快速定位问题。
                    </FeatureCell>
                  </div>
                  <div className={styles.featureRow}>
                    <FeatureCell title="缓存组件">
                      缓存包括本地缓存和分布式缓存，支持多 encoding(json，msgpack, protobuf等)，可通过命令行直接生成。
                    </FeatureCell>
                    <FeatureCell title="分布式锁">
                      支持超时控制的分布式锁
                    </FeatureCell>
                  </div>
                  <div className={styles.featureRow}>
                    <FeatureCell title="链路追踪">
                      支持的组件包括http、gRPC、redis、orm、日志等核心组件。
                    </FeatureCell>
                    <FeatureCell title="Proto管理">
                      可快速生成proto模板及其pb文件，也可以生成server骨架代码，你只需要填充业务代码即可。
                    </FeatureCell>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.architectureSection}>
            <div className={styles.feature}>
              <div className={styles.col1}>
                <h2>简单直观</h2>
                <p>
                  复杂性和不必要的抽象被搁置一旁，以便您花更多时间编码而不是阅读文档。
                  <br />
                  <br />
                  这里<strong>没有陡峭的学习曲线</strong> 或过度设计.
                </p>
              </div>
              <div className={styles.col2}>
                <div className={styles.architectureWrapper}>
                  <img src={useBaseUrl('img/home/architecture2.png')} alt="" className={styles.codeImage} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.typescriptSection}>
            <div className={styles.feature}>
              <div className={styles.col2}>
                <div className={styles.typescriptWrapper}>
                  <div>
                    <svg  viewBox="0 0 27 26" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m.98608 0h24.32332c.5446 0 .9861.436522.9861.975v24.05c0 .5385-.4415.975-.9861.975h-24.32332c-.544597 0-.98608-.4365-.98608-.975v-24.05c0-.538478.441483-.975.98608-.975zm13.63142 13.8324v-2.1324h-9.35841v2.1324h3.34111v9.4946h2.6598v-9.4946zm1.0604 9.2439c.4289.2162.9362.3784 1.5218.4865.5857.1081 1.2029.1622 1.8518.1622.6324 0 1.2331-.0595 1.8023-.1784.5691-.1189 1.0681-.3149 1.497-.5879s.7685-.6297 1.0187-1.0703.3753-.9852.3753-1.6339c0-.4703-.0715-.8824-.2145-1.2365-.1429-.3541-.3491-.669-.6186-.9447-.2694-.2757-.5925-.523-.9692-.7419s-.8014-.4257-1.2743-.6203c-.3465-.1406-.6572-.2771-.9321-.4095-.275-.1324-.5087-.2676-.7011-.4054-.1925-.1379-.3409-.2838-.4454-.4379-.1045-.154-.1567-.3284-.1567-.523 0-.1784.0467-.3392.1402-.4824.0935-.1433.2254-.2663.3959-.369s.3794-.1824.6269-.2392c.2474-.0567.5224-.0851.8248-.0851.22 0 .4523.0162.697.0486.2447.0325.4908.0825.7382.15.2475.0676.4881.1527.7218.2555.2337.1027.4495.2216.6475.3567v-2.4244c-.4015-.1514-.84-.2636-1.3157-.3365-.4756-.073-1.0214-.1095-1.6373-.1095-.6268 0-1.2207.0662-1.7816.1987-.5609.1324-1.0544.3392-1.4806.6203s-.763.6392-1.0104 1.0743c-.2475.4352-.3712.9555-.3712 1.5609 0 .7731.2268 1.4326.6805 1.9785.4537.546 1.1424 1.0082 2.0662 1.3866.363.146.7011.2892 1.0146.4298.3134.1405.5842.2865.8124.4378.2282.1514.4083.3162.5403.4946s.198.3811.198.6082c0 .1676-.0413.323-.1238.4662-.0825.1433-.2076.2676-.3753.373s-.3766.1879-.6268.2473c-.2502.0595-.5431.0892-.8785.0892-.5719 0-1.1383-.0986-1.6992-.2959-.5608-.1973-1.0805-.4933-1.5589-.8879z" fillRule="evenodd"></path></svg>
                    <strong>TypeScript</strong>
                  </div>
                </div>
              </div>
              <div className={styles.col1}>
                <h2>Robust Language</h2>
                <p>
                Foal leverages <strong>TypeScript</strong> to improve the overall quality of your code
                and detect most of your careless errors during compilation.
                The language also gives you <strong>autocompletion</strong> and a <strong>well-documented API</strong>.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialsSection}>
            <div className={styles.testimonials}>
              <h2>Eagle可以做什么</h2>
              <div className={styles.content}>
                <Testimonial title="微服务搭建" author="" job="">
                  可以快速搭建微服务和HTTP服务，使用Eagle提供的核心组件，快速交付
                </Testimonial>
                <Testimonial title="多协议支持" author="" job="">
                  可以通过一套 Proto API定义，实现HTTP/gRPC协议的服务
                </Testimonial>
                <Testimonial title="快速构建" author="" job="">
                  通过 Eagle Cli 可以快速构建应用
                </Testimonial>
              </div>
            </div>
          </div> */}
          <div className={styles.getStartedSection}>
            <div className={styles.getStarted}>
              <Link
                className={styles.btn}
                to={useBaseUrl("docs/getting-started/start")}>
                Get started
              </Link>
            </div>
          </div>
          {/* <footer className={styles.footerWrapper}>
            <div className={styles.footer}>
              <a className={styles.githubLink} href="https://github.com/go-eagle/eagle"></a>
              <a className={styles.twitterLink} href="https://twitter.com/go-eagle"></a>
              <a className={styles.youtubeLink} href="https://www.youtube.com/channel/xxxxx"></a>
              <a className={styles.chatLink} href="https://discord.gg/HtTfsxFN"></a>
            </div>
          </footer> */}
        </section>
    </Layout>
  );
}

export default Home;