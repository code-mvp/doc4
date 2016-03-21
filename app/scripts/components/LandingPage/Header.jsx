(function() {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var localStorage = require('localStorage');
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../stores/UserStore');
  var UserAction = require('../../actions/UserActions');
    module.exports = React.createClass({
      contextTypes: {
        router: React.PropTypes.object
      },
      getInitialState: function() {
        return {
          logout: '',
          profile: '',
          create: '',
          buttonClass: ''
        };
      },

      componentDidMount: function() {
        UserStore.addChangeListener(this.decoded, 'decode');
        this.handleToken();
      },

      handleToken: function() {
        var token = localStorage.getItem('x-access-token');
        if(token) {
          this.setState({
            logout: 'Logout',
            profile: 'Profile',
            create: 'Create Doc',
            buttonClass: "mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect headerbutton"
          });
        }
      },

      decoded: function() {
        var decoded = UserStore.getDecodedData();
        if (decoded.error === 'You are not authenticated user') {
          toastr.error('You must be logged in bitte :)', {timeout: 3000});
          this.setState({
            logout: '',
            profile: '',
            create: '',
            buttonClass: ''
          });
          browserHistory.push('/');
        } if (decoded.error === 'Failed to Authenticate. You are not logged in.') {
          this.context.router.push('/');
        } if (!decoded.error && decoded) {
          this.setState({
            logout: 'launch',
            profile: 'person',
            create: 'add',
            dashboard: 'dashboard',
            buttonClass: "mdl-button close mdl-js-button"
          });
        }
      },

      profile: function() {
        this.context.router.push('/profile');
      },

      dashboard: function() {
        this.context.router.push('/dashboard');
      },

      create: function() {
        this.context.router.push('/create');
      },

      home: function() {
        this.context.router.push('/');
      },

      logout: function() {
        localStorage.removeItem('x-access-token');
        var token = localStorage.getItem('x-access-token');
        if(!token) {
          this.setState({
            logout: '',
            profile: '',
            create: '',
            dashboard: '',
            buttonClass: ''
          });
        }
        browserHistory.push('/');
      },

      render: function() {
        return (
          <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
             <div className="mdl-layout__header-row">
               <a id="home" className="mdl-layout-title" onClick={this.home}>Doc4</a>
               <div className="mdl-layout-spacer"></div>
               <div className="mdl-grid">
                 <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                   <a id="headerbutton" className={this.state.buttonClass} onClick={this.create}>
                     <div id="createdoc"className="material-icons">{this.state.create}</div>
                       <div className="mdl-tooltip" htmlFor="createdoc">Create</div>
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                   <a id="headerbutton" className={this.state.buttonClass} onClick={this.dashboard}>
                     <i id="dashlink" className="material-icons">{this.state.dashboard}</i>
                     <div className="mdl-tooltip" htmlFor="dashlink">Dashboard</div>
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                   <a id="headerbutton" className={this.state.buttonClass} onClick={this.profile}>
                     <i id="profilelink" className="material-icons">{this.state.profile}</i>
                     <div className="mdl-tooltip" htmlFor="profilelink">Profile</div>
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                   <a id="logout" id="headerbutton" className={this.state.buttonClass} onClick={this.logout}>
                     <i id="logoutlink" className="material-icons">{this.state.logout}</i>
                     <div className="mdl-tooltip" htmlFor="logoutlink">Logout</div>
                   </a>
                 </div>
               </div>
             </div>
           </header>
           <div className="mdl-layout__drawer">
             <span className="mdl-layout-title">Doc4</span>
             <nav className="mdl-navigation">
               <a className="mdl-navigation__link" href="/create">{this.state.create}</a>,
               <a className="mdl-navigation__link" href="/profile">{this.state.profile}</a>
               <a className="mdl-navigation__link" onClick={this.logout}>{this.state.logout}</a>
             </nav>
           </div>
          <main className="mdl-layout__content">
            {this.props.children}
          </main>
          </div>
        </div>
        );
      }
    });
})();
