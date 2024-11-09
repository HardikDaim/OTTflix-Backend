// Sample data for movies
const movies = [
    { id: '1', title: 'Inception', description: 'A mind-bending thriller', poster: 'inception.jpg', rating: 8.8 },
    { id: '2', title: 'Titanic', description: 'A love story on the Titanic', poster: 'titanic.jpg', rating: 7.8 },
  ];
  
  const resolvers = {
    Query: {
      getMovies: () => movies,
      getMovie: (parent, args) => movies.find(movie => movie.id === args.id),
    },
  };
  
  module.exports = resolvers;
  