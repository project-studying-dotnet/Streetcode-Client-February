import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StreetcodeSlider from '@/features/MainPage/StreetcodeSlider/StreetcodeSlider.component';
import StreetcodesApi from '@/app/api/streetcode/streetcodes.api';

jest.mock('@/app/api/streetcode/streetcodes.api', () => ({
    getAllMainPage: jest.fn(),
}));

jest.mock('@/features/SlickSlider/SlickSlider.component', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);
jest.mock('@/features/MainPage/StreetcodeSlider/StreetcodeSliderItem/StreetcodeSliderItem.component', () => ({ streetcode }: { streetcode: any }) => <div>{streetcode.title}</div>);

describe('StreetcodeSlider Component', () => {
    test('renders the StreetcodeSlider component with fetched data', async () => {
      const mockData = [
          { id: 1, title: 'Streetcode 1' },
          { id: 2, title: 'Streetcode 2' },
      ];
  
      (StreetcodesApi.getAllMainPage as jest.Mock).mockResolvedValueOnce(mockData);
  
      await act(async () => {
          render(<StreetcodeSlider />);
      });
  
      await waitFor(() => {
          expect(screen.getByText('Streetcode 1')).toBeInTheDocument();
          expect(screen.getByText('Streetcode 2')).toBeInTheDocument();
      });
  });
  

    test('renders nothing when there is no data', async () => {
        (StreetcodesApi.getAllMainPage as jest.Mock).mockResolvedValueOnce([]);

        await act(async () => {
          render(<StreetcodeSlider />);
      });

        await waitFor(() => {
            expect(screen.queryByText('Streetcode 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Streetcode 2')).not.toBeInTheDocument();
        });
    });
});