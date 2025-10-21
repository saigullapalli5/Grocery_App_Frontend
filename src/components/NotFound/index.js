import { NotFoundContainer } from "./styledComponents";

const NotFound = () => (
  <NotFoundContainer>
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 text-lg">Sorry, the page you're looking for doesn't exist.</p>
    </div>
  </NotFoundContainer>
);

export default NotFound;
