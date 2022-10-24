const FEATURE_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
  'An abstraction on feature HttpInterceptor[]'
);

@Injectable()
class FeatureHttpClient extends HttpClient {
  constructor(
    backend: HttpBackend,
    @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
    @Inject(FEATURE_HTTP_INTERCEPTORS) featureInterceptors: HttpInterceptor[],
  ) {
    super(new InterceptingHandler(
      backend,
      [interceptors, featureInterceptors].flat()
    ));
  }
}
