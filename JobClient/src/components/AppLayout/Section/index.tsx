import Main from "./Main";
import { SectionWrapper } from "./Section.styled";
import IListItem from "./modules/constant";
import Sidebar from "../sidebar";
export interface SectionProps {
    // selects?: Array<FormControlProps>,
    content: Array<IListItem>;
}
const Section: React.FC<SectionProps> = (props) => {
    const { content } = props
    return (
        <SectionWrapper>
            <Sidebar content={content}></Sidebar>
            <Main></Main>
        </SectionWrapper>
    );
};
export default Section;