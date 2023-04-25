import { GetStaticProps, NextPage } from "next";
import Section, { SectionProps } from "@client/components/Section/Section";
import Layout from "@client/components/Common/Layout";
import Skills from "@client/components/Skills/Skills";
import Experience from "@client/components/Experience/Experience";
import HomeContent from "@client/components/HomeContent/HomeContent";
import HomeSlide from "@client/components/HomeSlide/HomeSlide";
import { useHomeContext, withHomeContext } from "@client/contexts/HomeContext";
import Portfolio from "@client/components/Portfolio/Portfolio";
import Contact from "@client/components/Contact/Contact";
import axios from 'axios';
import PageHead from "@client/components/Common/PageHead";

interface Section {
  value: string;
  component: React.ElementType;
  rightTranslate?: boolean;
  small?: boolean;
  fixed?: boolean;
  showTitle?: boolean;
  centerContent?: boolean;
  fullWidth?: boolean;
}

const slideableSections: Section[] = [
  {
    component: HomeSlide,
    value: 'home',
    small: true,
    fixed: true,
    centerContent: true,
    showTitle: false,
  },
  {
    component: Skills,
    value: 'skills',
  },
  {
    component: Experience,
    value: 'experienceAndEdu',
  },
  {
    component: Portfolio,
    value: 'portfolio',
    // fullWidth: true,
  },
  {
    component: Contact,
    value: 'contact',
    small: true,
  }
];


const IndexPage: NextPage = () => {
  const { activeSection, data, } = useHomeContext();

  const sectionEls = slideableSections.map(slide => {
    const props: SectionProps = {
      ...slide,
      active: slide.value === activeSection,
      type: slide.value,
      section: data.sections[slide.value]
    };
    return (
      <Section key={slide.value} {...props}>
        <slide.component {...props} />
      </Section>
    );
  });

  return (
    <PageHead
      title={data.general.pageTitle}
      description={data.general.pageDescription}
      robots="index"
    >
      <Layout>
        <main className="fade">
          {sectionEls}
          <HomeContent />
        </main>
      </Layout>
    </PageHead>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios(`${process.env.SERVER_HOST}/api/home`);

  return {
    props: { data: response.data, },
    revalidate: 10000
  }
};

export default withHomeContext(IndexPage);