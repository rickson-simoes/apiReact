import React, { Component } from 'react';
import propTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../Components/Container';
import { Loading } from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        repository: propTypes.string
      })
    }).isRequired
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: true
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      })
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading> Carregando... </Loading>;
    }

    return <Container>Repository</Container>;
  }
}
