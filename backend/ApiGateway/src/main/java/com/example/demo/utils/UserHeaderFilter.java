
package com.example.demo.utils;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
@Component
public class UserHeaderFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                             org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {

        return ReactiveSecurityContextHolder.getContext()
                .map(ctx -> ctx.getAuthentication())
                .filter(auth -> auth != null && auth.isAuthenticated())
                .cast(org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken.class)
                .map(auth -> auth.getToken())
                .map(jwt -> {
                    String username = jwt.getSubject();

                    Number userIdNum = jwt.getClaim("userId");
                    String userId = userIdNum != null ? String.valueOf(userIdNum.longValue()) : "";

                    var roles = jwt.getClaimAsStringList("roles");

                    return exchange.mutate()
                            .request(r -> r
                                    .header("X-User-Name", username)
                                    .header("X-User-Id", userId)
                                    .header("X-User-Roles", String.join(",", roles))
                            )
                            .build();
                })

                .defaultIfEmpty(exchange) // ⭐ if no JWT, just continue untouched
                .flatMap(chain::filter);
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE; // run AFTER security & routing
    }
}
