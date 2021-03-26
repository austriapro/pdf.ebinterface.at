package at.austriapro.pdfebinterface;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

/**
 * Redirects every page to index.html Used to handle the router
 */
@Configuration
public class SinglePageAppConfig implements WebMvcConfigurer {
  @Override
  public void addResourceHandlers(final ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
    .addResourceLocations("classpath:/static/")
    .resourceChain(false)
    .addResolver(new PushStateResourceResolver());
  }

  private class PushStateResourceResolver implements ResourceResolver {

    private final Resource index = new ClassPathResource("/static/index.html");
    private final List<String>
    handledExtensions =
    Arrays.asList("html", "js", "json", "csv", "css", "png", "svg", "eot", "ttf", "woff", "woff2", "map", "appcache", "jpg", "jpeg",
                  "gif", "ico");
    private final List<String> ignoredPaths = Arrays.asList("api");

    @Override
    public Resource resolveResource(final HttpServletRequest request, final String requestPath, final List<? extends Resource> locations,
                                    final ResourceResolverChain chain) {
      return resolve(requestPath, locations);
    }

    @Override
    public String resolveUrlPath(final String resourcePath, final List<? extends Resource> locations, final ResourceResolverChain chain) {
      final Resource resolvedResource = resolve(resourcePath, locations);
      if (resolvedResource == null) {
        return null;
      }
      try {
        return resolvedResource.getURL().toString();
      } catch (final IOException e) {
        return resolvedResource.getFilename();
      }
    }

    private Resource resolve(final String requestPath, final List<? extends Resource> locations) {
      if (isIgnored(requestPath)) {
        return null;
      }
      if (isHandled(requestPath)) {
        return locations.stream()
            .map(loc -> createRelative(loc, requestPath))
            .filter(resource -> resource != null && resource.exists())
            .findFirst()
            .orElseGet(null);
      }
      return index;
    }

    private Resource createRelative(final Resource resource, final String relativePath) {
      try {
        return resource.createRelative(relativePath);
      } catch (final IOException e) {
        return null;
      }
    }

    private boolean isIgnored(final String path) {
      return ignoredPaths.contains(path);
    }

    private boolean isHandled(final String path) {
      final String extension = StringUtils.getFilenameExtension(path);
      return handledExtensions.stream().anyMatch(ext -> ext.equals(extension));
    }
  }
}
