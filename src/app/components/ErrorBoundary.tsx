import React from 'react';

type Props = {
	fallback: string | React.ReactNode;
	children: React.ReactNode;
};

type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
	state = { hasError: true };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log(error, errorInfo);
	}

	render() {
		return this.state.hasError ? this.props.fallback : this.props.children;
	}
}

export default ErrorBoundary;
