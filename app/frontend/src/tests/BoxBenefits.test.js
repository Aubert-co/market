import { render, screen, fireEvent } from '@testing-library/react';
import { ListBenefits ,BoxBenefits} from '../Components/BoxBenefits'; 

import '@testing-library/jest-dom'
describe('ListBenefits', () => {
  const scrollToFormMock = jest.fn(); 

  const benefits = [
    { title: 'Benefit 1', img: 'img1.jpg', content: 'Description for benefit 1' },
    { title: 'Benefit 2', img: '', content: 'Description for benefit 2' },
  ];

  beforeEach(() => {
    render(<ListBenefits benefits={benefits} scrollToForm={scrollToFormMock} />);
  });

  it('renders all benefits passed as props', () => {
    const benefitTitles = benefits.map(benefit => benefit.title);
    benefitTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('does not render an image when img is not provided', () => {
    const benefit2 = benefits[1];
    const imgElement = screen.queryByAltText(benefit2.title);
    expect(imgElement).not.toBeInTheDocument();
  });

  it('calls scrollToForm when a benefit is clicked', () => {
    const benefitBox = screen.getAllByText('Benefit 1')[0].closest('.benefit-box');
    fireEvent.click(benefitBox);
    expect(scrollToFormMock).toHaveBeenCalledTimes(1);
  });

  it('renders content correctly', () => {
    benefits.forEach(({ content }) => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });
});




describe('BoxBenefits', () => {
  const mockScrollIntoView = jest.fn();
  const mockFormRef = { current: { scrollIntoView: mockScrollIntoView } };

  const benefits = [
    { title: 'Benefit 1', img: 'img1.jpg', content: 'Benefit 1 content' },
    { title: 'Benefit 2', img: 'img2.jpg', content: 'Benefit 2 content' }
  ];

  const adText = 'Amazing Store';
  const adLink = 'Click here to scroll to form';

  beforeEach(() => {
    render(
      <BoxBenefits
        adText={adText}
        adLink={adLink}
        benefits={benefits}
        formRef={mockFormRef}
      />
    );
  });

  test('renders the component with the adText and adLink', () => {
    expect(screen.getByText(adText)).toBeInTheDocument();
    expect(screen.getByText(adLink)).toBeInTheDocument();
  });

  test('renders benefits correctly', () => {
    benefits.forEach((benefit) => {
      expect(screen.getByText(benefit.title)).toBeInTheDocument();
      expect(screen.getByText(benefit.content)).toBeInTheDocument();
     
    });
  });

  test('scrolls to the form when adLink is clicked', () => {
    const link = screen.getByText(adLink);
    fireEvent.click(link);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
